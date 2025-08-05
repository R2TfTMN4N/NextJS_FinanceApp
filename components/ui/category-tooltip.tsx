import {format} from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./separator";
export const CategoryTooltip=({
  active,payload}:any)=>{
    if (!active) return null;
    const name=payload[0].payload.name;
    const value=payload[0].value;
    return (
      <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
          {name}
        </div>
        <Separator />
      

        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-2 min-w-[80px]">
            <div className="h-2 w-2 rounded-full bg-red-500 mt-0.5" />
            <span className="text-sm text-muted-foreground">Expenses</span>
          </div>

          <span className="text-sm font-medium text-right ml-4">
            {formatCurrency(value * -1)}
          </span>
        </div>
      </div>
    );


  }