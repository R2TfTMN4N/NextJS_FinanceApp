import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";
import { cn } from "@/lib/utils";

type Props={
    account: string;
    accountId: string;
}
export const AccountColumn=({account,accountId}:Props) => {
    const { onOpen:openAccount } = useOpenAccount();
    const  onClick=() => openAccount(accountId);
    return (
      <div
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 cursor-pointer",
          "hover:bg-accent hover:underline hover:text-accent-foreground",
          "px-2 py-1 rounded-md"
        )}
      >
        <span className="text-sm font-medium">{account}</span>
      </div>
    );
}
