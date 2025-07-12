import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateAccount } from "../api/use-create-account";

type FormValues = {
  name: string;
};

export const NewAccountSheet = () => {
  const {isOpen,onClose} = useNewAccount();
  const mutation=useCreateAccount()
  
  const onSubmit=(values:FormValues)=>{
    console.log("📝 Form submitted with values:", values);
    console.log("🔄 Mutation state:", {
      isPending: mutation.isPending,
      isError: mutation.isError,
      error: mutation.error
    });
    
    mutation.mutate(values,{
        onSuccess:(data)=>{
            console.log("✅ Success response:", data);
            onClose();
        },
        onError:(error)=>{
            console.log("❌ Error:", error);
        }
    })
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction
          </SheetDescription>
        </SheetHeader>
        <AccountForm 
            onSubmit={onSubmit} 
             disabled={mutation.isPending}
            defaultValues={{name:""}}/>
      </SheetContent>
    </Sheet>
  );
};
