"use client";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
// import { useGetTransaction } from "@/features/transactions/api/use-get-transaction";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import { UploadButton } from "./uploadbutton";
import { ImportCard } from "./import-card";
import { transactions as transactionSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";
enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}
const INITIAL_IMPORT_RESULT = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResult, setImportResult] = useState(INITIAL_IMPORT_RESULT);
  const onUpload = (result: typeof INITIAL_IMPORT_RESULT) => {
    setImportResult(result);
    setVariant(VARIANTS.IMPORT);
  };
  const onCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResult(INITIAL_IMPORT_RESULT);
  };

  const newTransaction = useNewTransaction();
  const createTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || [];
  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

  const onSubmitImport = async (
    values: typeof transactionSchema.$inferInsert[]
  ) => {
    const accountId = await confirm();
    if (!accountId) {
      return toast.error("Please select an account to continue . . .");
    }
    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));
    createTransactions.mutate(data,{
      onSuccess:()=>{
        onCancelImport()
      }
    })

  };

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResult.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions page
          </CardTitle>

          <div className="flex flex-col gap-y-2 md:flex-row md:items-center md:gap-x-2">
            <UploadButton onUpload={onUpload} className="w-full md:w-auto">
              Import
            </UploadButton>

            <Button
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full md:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Add New
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            filterKey="payee"
            columns={columns}
            data={transactions}
            disabled={isDisabled}
          ></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};
export default TransactionsPage;
