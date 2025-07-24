import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
  const calendarRef = React.useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Delay để đảm bảo calendar đã render
      setTimeout(() => {
        calendarRef.current?.focus();
      }, 10);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : "Select a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div ref={calendarRef} tabIndex={-1}>
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={disabled ? () => true : undefined}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
