"use client"
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useGetSummary from "@/features/summary/api/use-get-summary";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";
import { format, subDays } from "date-fns";
import { useState } from "react";
import { cn, formatDateRange } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

export const DateFilter = () => {
    const router = useRouter();

    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const pathname = usePathname();
    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);
    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo
    }
    const [date, setDate] = useState<DateRange | undefined>(
        paramState
    );
    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
            accountId,
        }
        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, { skipNull: true, skipEmptyString: true })
        router.push(url);
    }
    const onReset = () => {
        setDate(undefined);
        pushToUrl(undefined);
    }
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={false}
            size="sm"
            className="
          lg:w-auto w-full h-9 px-3 rounded-md
          bg-white/20 hover:bg-white/30
          border border-white/30
          text-white placeholder:text-white/80
          font-medium
          shadow-sm
          backdrop-blur-md
    transition-all
    focus:outline-none focus:ring-2 focus:ring-white/50
  "
          >
            <span>{formatDateRange(paramState)}</span>
            <ChevronDown className="ml-2 size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="lg:w-auto
             w-full p-0"
          align="start"
        >
          <Calendar
            mode="range"
            defaultMonth={date?.from || defaultFrom}
            selected={date}
            disabled={false}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-between p-4 w-full">
            <PopoverClose asChild>
              <Button
                onClick={onReset}
                disabled={!date?.from || !date?.to}
                variant="outline"
                className="mt-2 w-full"
              >
                Reset
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                onClick={() => pushToUrl(date)}
                disabled={!date?.from || !date?.to}
                variant="outline"
                className="mt-2 w-full"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    );
}

