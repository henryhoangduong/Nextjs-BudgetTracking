import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { OverviewQuerySchema } from "@/schema/overview";
import { GetFormatterForCurrency } from "@/lib/helpers";
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const queryParams = OverviewQuerySchema.safeParse({
    from,
    to,
  });
  if (!queryParams.success) {
    return Response.json(queryParams.error.message, {
      status: 400,
    });
  }
  const transactionHistory = await getTransactionHistory(
    user.id,
    queryParams.data.from,
    queryParams.data.to,
  );
  return Response.json(transactionHistory);
}
export type GetTransactionHistoryType = Awaited<
  ReturnType<typeof getTransactionHistory>
>;
const getTransactionHistory = async (userId: string, from: Date, to: Date) => {
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userSettings) {
    throw new Error("user settinngs not found");
  }
  const formatter = GetFormatterForCurrency(userSettings.currency);
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return transactions.map((transaction) => ({
    ...transaction,
    fortmattedAmount: formatter.format(transaction.amount),
  }));
};
