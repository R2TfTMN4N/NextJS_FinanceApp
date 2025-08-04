import { useQuery } from "@tanstack/react-query";
import {client} from "@/lib/hono"
import { convertAmountFromMiliunits } from "@/lib/utils";
type Transaction = {
  id: string;
  amount: number;
  date: string;
  accountId: string;
  categoryId: string | null;
  payee: string;
  notes: string | null;
};


export const useGetTransaction = (id?: string) => {
  return useQuery<Transaction>({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });
      if (!response.ok) throw new Error("failed to fetch transaction");

      const { data } = await response.json();
      const tx = Array.isArray(data) ? data[0] : data; // just in case

      return {
        ...tx,
        amount: convertAmountFromMiliunits(tx.amount),
      };
    },
  });
};

