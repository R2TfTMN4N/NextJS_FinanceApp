import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNew } from "../hooks/use-new-account";
import {
  TransactionForm,
  FormValues,
} from "@/features/transactions/components/transaction-form";
import { useCreateTransaction } from "../api/use-create-account";

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNew();
  const mutation = useCreateTransaction();
  const onSubmit = (formValues: FormValues) => {
    mutation.mutate(formValues, {
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
        <TransactionForm
          onSubmit={onSubmit}
          defaultValues={{ name: "" }}
          disabled={mutation.isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
