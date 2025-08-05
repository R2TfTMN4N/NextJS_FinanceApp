import { RadialBar,Legend,RadialBarChart,ResponsiveContainer} from "recharts";
import { formatCurrency } from "@/lib/utils";

const COLORS = ["#0062ff","#12C6ff","#ff647f","#ff9354"];
type Props = {
    data?: {
        name: string;
        value: number;
    }[]
}
export const RadialVariant=({data}:Props)=>{
    return (
      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart 
        cx="50%" cy="50%" 
        innerRadius={20} outerRadius={140}
         barSize={10} data={data?.map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length],
          }))}>
            <RadialBar
            label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
            background
            dataKey="value">

            </RadialBar>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="right"
            iconType="circle"
            content={({ payload }: any) => {
              
              return (
                <ul className="flex flex-col space-y-2">
                  {payload.map((entry: any, index: number) => {

                    return (
                      <li
                        key={`item-${index}`}
                        className="flex items-center space-x-2"
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-muted-foreground">
                          {entry.value}
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(entry.payload.value)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          />
            
           
        </RadialBarChart>
      </ResponsiveContainer>
    );
}
