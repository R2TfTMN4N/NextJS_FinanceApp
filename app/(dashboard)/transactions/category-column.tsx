import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transactions";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props={
    id:string
    category: string|null;
    categoryId: string|null;
}
export const CategoryColumn=({id,category,categoryId}:Props) => {
    const { onOpen:openCategory } = useOpenCategory();
    const { onOpen: openTransaction } = useOpenTransaction();
    const  onClick=() =>{
        if (categoryId) openCategory(categoryId);
        else openTransaction(id);
    };
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 cursor-pointer",
                "hover:bg-accent hover:underline hover:text-accent-foreground",
                "px-2 py-1 rounded-md",
                !category && "text-red-500"
            )}>
            {!categoryId && <TriangleAlert className="h-4 w-4 text-red-500" />}
            {category||"Uncategorized"}
        </div>
    );
}
