"use client"
import { Card,CardContent,CardTitle,CardHeader } from "@/components/ui/card" 
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { Payment,columns } from "./columns"
import { DataTable } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     {
//       id: "728e152f",
//       amount: 100,
//       status: "pending",
//       email: "mq@example.com",
//     },
//     // ...
//   ];
// }
const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m111@example.com",
  },
  // ...
];


const AccountsPage=()=>{
    const newAccount=useNewAccount()

    return (
        <div className="max-w-screen-xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Accounts page

                    </CardTitle>
                    <Button onClick={newAccount.onOpen} size="sm">
                        <Plus className="size-4 mr-2"></Plus>
                        Add New
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable disabled={false} onDelete={()=>{}} filterKey="email" columns={columns} data={data}>

                    </DataTable>
                </CardContent>

            </Card>
        </div>
    )
}
export default AccountsPage