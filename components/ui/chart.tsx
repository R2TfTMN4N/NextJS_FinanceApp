import { AreaChart, BarChart, FileSearch, LineChart, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./select";
import { Card,CardContent,CardHeader,CardTitle } from "./card";
import { AreaVariant } from "./area-variant";
import { BarVariant } from "./bar-variant";
import { LineVariant } from "./line-variant";
import { useState } from "react";
import { Skeleton } from "./skeleton";


type Props={
    data?:{
        date:string;
        income: number; 
        expenses: number;
    }[]
}



export const Chart = ({ data=[] }: Props) => {
    const [chartType, setChartType] = useState<"area" | "bar" | "line">("area");
    const onTypeChange = (type: "area" | "bar" | "line") => {
        setChartType(type);
    }
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">Transacions</CardTitle>
                <Select
                    defaultValue={chartType}
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Select chart type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="area">
                            <div className="flex items-center">
                                <AreaChart className="size-4 mr-2 shrink-0" />
                                <p className="line-clamp-1">Area</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="bar">
                            <div className="flex items-center">
                                <BarChart className="size-4 mr-2 shrink-0" data={data} />
                                <p className="line-clamp-1">Bar</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="line">
                            <div className="flex items-center">
                                <LineChart className="size-4 mr-2 shrink-0" data={data} />
                                <p className="line-clamp-1">Line</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground"/>
                        <p className="text-muted-foreground">No data available</p>
                    </div>

                ):
                (
                    <>
                    {chartType === "area" && (
                        <AreaVariant data={data} />
                    )}
                    {chartType === "bar" && (
                        <BarVariant data={data} />
                    )}
                    {chartType === "line" && (
                        <LineVariant data={data} />
                    )}
                </>
                )}
                
            </CardContent>
        </Card>
    );
};
export const ChartLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[350px] w-full items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
