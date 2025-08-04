import {format} from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./separator";
export const CustomTooltip=({
  active,payload}:any)=>{
    if (!active) return null;
    const date=payload[0].payload.date;
    const income=payload[0].value;
    const expenses=payload[1].value;
    return (
      <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
          {format(new Date(date), "MMM dd, yyyy")}
        </div>
        <Separator />
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2 min-w-[80px]">
            <div className="h-2 w-2 rounded-full bg-blue-500 mt-0.5" />
            <span className="text-sm text-muted-foreground">Income</span>
          </div>

          <span className="text-sm font-medium text-right ml-4">
            {formatCurrency(income)}
          </span>
        </div>

        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2 min-w-[80px]">
            <div className="h-2 w-2 rounded-full bg-red-500 mt-0.5" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>

          <span className="text-sm font-medium text-right ml-4">
            {formatCurrency(expenses*-1)}
          </span>
        </div>
      </div>
    );


  }