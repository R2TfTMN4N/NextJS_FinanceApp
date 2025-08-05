import { Cell,Legend,Pie,PieChart,ResponsiveContainer, Tooltip} from "recharts";
import { formatPercentage } from "@/lib/utils";
import { CategoryTooltip } from "./category-tooltip";

const COLORS = ["#0062ff","#12C6ff","#ff647f","#ff9354"];
type Props = {
    data?: {
        name: string;
        value: number;
    }[]
}
export const PieVariant=({data}:Props)=>{
    return (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="right"
            iconType="circle"
            content={({ payload }: any) => {
              const total =
                data?.reduce((sum, item) => sum + item.value, 0) || 0;

              return (
                <ul className="flex flex-col space-y-2">
                  {payload.map((entry: any, index: number) => {
                    const value = entry.payload.value;
                    const percent = total ? (value / total) * 100 : 0;

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
                          {formatPercentage(percent)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          />
            <Tooltip
                content={<CategoryTooltip />}
                
          />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={60}
            paddingAngle={2}
            fill="#8884d8"
            labelLine={false}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
}
