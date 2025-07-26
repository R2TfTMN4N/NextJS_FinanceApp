import { toast } from "sonner";
import {  InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?:string) => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      if (!id) throw new Error("ID is required");

      // console.log("Deleting category with ID:", id);
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id }
      });
      
      // console.log("Delete response status:", response.status);
      // console.log("Delete response ok:", response.ok);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        // console.log("Delete error data:", errorData);
        const errorMessage = (errorData as {error?: string})?.error || `Failed to delete category (${response.status})`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      // console.log("Delete success result:", result);
      return result;
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete category");
    },
  });
  
  return mutation;
};
