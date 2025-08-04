"use client"

import useGetSummary from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation"
import { DataCard } from "./data-card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";


export const DataGrid=()=>{
    const {data}=useGetSummary();
    const params=useSearchParams();
    const to= params.get("to")||undefined;
    const from =params.get("from")||undefined;
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard
          dateRange={formatDateRange({ to, from })}
          title="Remaining"
          value={data?.remainingAmount}
          percentageChange={data?.remainingChange}
          icon={FaPiggyBank}
          variant="default"
        />
        <DataCard
          dateRange={formatDateRange({ to, from })}
          title="Income"
          value={data?.incomeAmount}
          percentageChange={data?.incomeChange}
          icon={FaArrowTrendUp}
          variant="default"
        />
        <DataCard
          dateRange={formatDateRange({ to, from })}
          title="Expenses"
          value={data?.expensesAmount}
          percentageChange={data?.expensesChange}
          icon={FaArrowTrendDown}
          variant="default"
        />
      </div>
    );
}