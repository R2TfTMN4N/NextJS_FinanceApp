import { DataChart } from "@/components/ui/data-chart";
import { DataGrid } from "@/components/ui/data-grid";

export default function DashboardPage(){
  return(
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid/>
      <DataChart/>

    </div>
  )
}