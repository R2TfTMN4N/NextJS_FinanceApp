import { Button } from "./button"
import { cn } from "@/lib/utils";
import Link from "next/link"
type Props={
    href:string;
    label:string;
    isActive?:boolean
}
export  const  NavButton =({
    href,
    label,
    isActive
}:Props) =>{
    return (
        <Button asChild
         size="sm" 
         variant="outline" 
         className={cn(
            "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-transparent outline-none text-white focus:bg-white/30  translation",
            isActive?"bg-white/10 text-white":"bg-transparent")}>
            <Link href={href}>
            {label}
            </Link>
        </Button>
    )
}