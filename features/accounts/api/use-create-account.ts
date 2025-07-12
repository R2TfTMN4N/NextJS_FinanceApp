import { toast } from "sonner";
import { InferRequestType,InferResponseType } from "hono";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import{client} from "@/lib/hono"
type ResponseType=InferResponseType<typeof client.api.accounts.$post>
type RequestType=InferRequestType<typeof client.api.accounts.$post>["json"]
export const useCreateAccount=()=>{
    const queryClient = useQueryClient();
    const mutation=useMutation<
        ResponseType,
        Error,
        RequestType>
        ({
            mutationFn:async (json)=>{
                console.log("🚀 Sending request to API with data:", json);
                console.log("🌐 API endpoint:", client.api.accounts.$url());
                
                try {
                    const response=await client.api.accounts.$post({json});
                    console.log("📡 Raw response:", response);
                    console.log("📊 Response status:", response.status);
                    console.log("📋 Response headers:", Object.fromEntries(response.headers.entries()));
                    
                    if (!response.ok) {
                        const errorText = await response.text();
                        console.log("❌ Error response body:", errorText);
                        throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }
                    
                    const result = await response.json();
                    console.log("📦 Parsed response:", result);
                    return result;
                } catch (error) {
                    console.log("💥 Request failed:", error);
                    throw error;
                }
            },
            onSuccess:(data)=>{
                console.log("🎉 onSuccess called with data:", data);
                toast.success("Account created");
                queryClient.invalidateQueries({queryKey:["accounts"]});
            },
            onError:(error)=>{
                console.log("😞 onError called with error:", error);
                toast.error("Failed to create account");
            }
        })
        return mutation
}
