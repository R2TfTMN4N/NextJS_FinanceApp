import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { useNewTransaction } from "../hooks/use-new-transaction";
import {
  TransactionForm,
} from "@/features/transactions/components/transaction-form";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  amount: z.number().int(),
  payee: z.string(),
  notes: z.string().nullable().optional(),
  categoryId: z.string().nullable().optional(),
});
type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();
  const categoryQuery=useGetCategories();
  const categoryMutation=useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
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
  
  const isPending = 
  createMutation.isPending || 
  categoryMutation.isPending || 
  accountMutation.isPending;

  const isLoading =
    categoryQuery.isLoading ||
    accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <TransactionForm
          onSubmit={onSubmit}
          disabled={isPending}
          categoryOptions={categoryOptions}
          onCreateCategory={onCreateCategory}
          accountOptions={accountOptions}
          onCreateAccount={onCreateAccount}
        />
          )
        }
       
      </SheetContent>
    </Sheet>
  );
};
