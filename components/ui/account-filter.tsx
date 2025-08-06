"use client";
import {
    SelectContent,
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
} from "./select";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { use } from "react";
import { is } from "drizzle-orm";
import useGetSummary from "@/features/summary/api/use-get-summary";

export const AccountFilter = () => {
    const router = useRouter();
    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const pathname = usePathname();
    const { isLoading: isLoadingSummary } = useGetSummary();
    const onChange = (newValue: string) => {
        const query = {
            accountId: newValue,
            from,
            to,
        };
        if (newValue === "all") {
            query.accountId = "";
        }
        const url = qs.stringifyUrl(
            {
                url: pathname,
                query,
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    };

    const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

    return (
        <>
            <Select
                value={accountId}
                onValueChange={onChange}
                disabled={isLoadingAccounts || isLoadingSummary}
            >
                <SelectTrigger
                    className="lg:w-auto w-full h-9 px-3 rounded-md
          bg-white/20 hover:bg-white/30 border border-white/30
          text-white placeholder:text-white/80
          font-medium shadow-sm backdrop-blur-md
    transition-all
    focus:outline-none focus:ring-2 focus:ring-white/50
  "
                >
                    <SelectValue
                        placeholder={<span className="text-white">Account</span>}
                    />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All accounts
                    </SelectItem>
                    {accounts?.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                            {account.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    );
};
