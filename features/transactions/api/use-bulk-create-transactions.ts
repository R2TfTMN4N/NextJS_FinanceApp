import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json,
      });

      // kiểm tra response
      if (!response.ok) {
        // const errorBody = await response.json();
        throw new Error( "Bulk create failed");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transactions created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err) => {
      console.error("BULK CREATE ERROR:", err);
      toast.error("Failed to create transactions");
    },
  });

  return mutation;
};
