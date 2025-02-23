"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Period, TimeFrame } from "@/lib/types";
import { UserSettings } from "@prisma/client";
import React, { useMemo, useState } from "react";
import HistoryPeriodSelector from "./HistoryPeriodSelector";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userSettings: UserSettings;
}

const History = ({ userSettings }: Props) => {
  const [timeframe, setTimeFrame] = useState<TimeFrame>("month");

  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const historyDataQuery = useQuery({
    queryKey: ["overview", "history", timeframe, period],
    queryFn: () => fetch(`api/history-data?timeframe=${timeframe}&year=${period.year}&month=${period.month}`).then((res)=>res.json())
  })
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const dataAvailable = historyDataQuery && historyDataQuery.data?.length > 0;
  return (
    <div className="container p-6">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeframe}
              setTimeFrame={setTimeFrame}
            />
            <div className="flex h-10 gap-2">
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm "
              >
                <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 text-sm "
              >
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dataAvailable&&<div className="">CHART</div> }
          {!dataAvailable && (
            <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
              No data for the selected period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or adding new transactions
              </p>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
