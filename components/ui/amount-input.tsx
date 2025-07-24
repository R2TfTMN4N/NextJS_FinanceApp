import CurrencyInput from "react-currency-input-field";
import { Info,MinusCircle,PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip";


type Props={
    value: string;
    onChange: (value: string|undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    // error?: boolean;
    // helperText?: string;
}
export const AmountInput = ({
    value,

    onChange,
    placeholder,
    disabled,
}: Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue >= 0;
    const isExpense = parsedValue < 0;
    const onReverseValue=() => {
        if(!value) return
        const newValue = (parsedValue * -1).toFixed(2);
        onChange(newValue.toString());}

    return (
      <div className="relative">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onReverseValue}
                disabled={disabled}
                className={cn(
                  "absolute top-1.5  left-1.5 rounded-full flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
                  "text-gray-700 hover:text-gray-800 disabled:cursor-not-allowed",
                  isIncome && "bg-green-400 text-white hover:bg-green-600",
                  isExpense && "bg-red-400 text-white hover:bg-red-600",
                
                )}
              >
                {!parsedValue && <Info className="size-4 text-white" />}
                {isIncome && <PlusCircle className="size-4 text-white " />}
                {isExpense && <MinusCircle className="size-4 text-white" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              Use [+] for income, [-] for expense
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CurrencyInput
            prefix="$"
           className=" pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            placeholder={placeholder}
            value={value}
            onValueChange={onChange}
            decimalScale={2}
            decimalsLimit={2}
            disabled={disabled}
        />
        <p className="text-xs text-muted-foreground mt-2">
            {isIncome && "This will count as income."}
            {isExpense && "This will count as expense."}
            {!parsedValue && "Please enter a valid amount."}

        </p>
      </div>
    );
};
