import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";
import { useCreateCategory } from "../api/use-create-category";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import z from "zod";

const formSchema = insertCategorySchema.pick({
  name: true,
});
type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const {isOpen,onClose} = useNewCategory();
  const mutation=useCreateCategory()
  const onSubmit=(values:FormValues)=>{
    mutation.mutate(values,{
        onSuccess:()=>{onClose()}
    })

  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to track your transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
            defaultValues={{name:""}}></CategoryForm>
      </SheetContent>
    </Sheet>
  );
};
