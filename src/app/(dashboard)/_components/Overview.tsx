"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constant";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import { difference } from "next/dist/build/utils";
import React, { useState } from "react";
import { toast } from "sonner";

const Overview = ({ userSettings }: { userSettings: UserSettings }) => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return (
    <>
      <div className="container flex flex-wrap items-end justify-between gap-2 p-6">
        <h2 className="text-3xl font-bold">Overview</h2>
        <h2 className="flex itemes-center gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(value) => {
              const { from, to } = value.range;
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
        </h2>
      </div>
    </>
  );
};

export default Overview;
