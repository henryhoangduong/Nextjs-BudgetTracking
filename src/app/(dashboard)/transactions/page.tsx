"use client";
import React, { useState } from "react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { differenceInDays, startOfMonth } from "date-fns";
import { toast } from "sonner";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constant";
import TransactionTable from "./_components/TransactionTable";

const Page = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <div className="border-b bg-card p-6">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <div>
          <p className="text-3xl font-bold">Transaction history</p>
        </div>
        <DateRangePicker
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          showCompare={false}
          onUpdate={(values) => {
            const { from, to } = values.range;
            if (!from || !to) return;
            if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
              toast.error(
                `The selected date range is too big. Max allow range is ${MAX_DATE_RANGE_DAYS}`,
              );
              return;
            }
            setDateRange({ from, to });
          }}
        />
      </div>
      <div>
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </div>
  );
};

export default Page;
