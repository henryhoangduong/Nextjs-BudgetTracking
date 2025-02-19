import { GetBalanceStatsResponseType } from "@/app/api/stats/balance/routes";
import { DateToUTCDate } from "@/lib/helpers";
import { UserSettings } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

const StatusCards = ({ from, to, userSettings }: Props) => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
      queryKey: ["overview", "stats", from, to],
      queryFn:()=> fetch(`api/stats/balanece?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res)=>res.json())
  });
  return <div></div>;
};

export default StatusCards;
