// schadcn components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {TransactionForm} from "@/features/transactions/components/transaction-form";
import { z } from "zod";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useGetTransaction } from "../api/use-get-transaction";
import { useOpenTransaction } from "../hooks/use-open-transactions";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
import { insertTransactionSchema } from "@/db/schema";
const formSchema = insertTransactionSchema.omit({
  id: true,
});
type FormValues = z.infer<typeof formSchema>;


export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();
  const transactionQuery = useGetTransaction(id);
  const mutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };
  const categoryOptions =
    (categoryQuery.data ?? []).map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const accountQuery = useGetAccounts();  
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  const accountOptions =
    accountQuery.data?.map((account) => ({
      value: account.id,
      label: account.name,
    })) || [];

  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete Transaction",
    "Are you sure you want to delete this transaction?"
  );
  const onSubmit = (formValues: FormValues) => {
    mutation.mutate(formValues, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  const isLoading =
    transactionQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const isPending =
    mutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

const data = transactionQuery.data;

const defaultValues = data
  ? {
      accountId: data.accountId,
      categoryId: data.categoryId,
      date: data.date ? new Date(data.date) : new Date(),
      payee: data.payee || "",
      notes: data.notes || "",
      amount: data.amount.toString(),
    }
  : {
      accountId: "",
      categoryId: "",
      date: new Date(),
      payee: "",
      notes: "",
      amount: "",
    };


  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Edit the name of the transaction
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-6 text-slate-600" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
