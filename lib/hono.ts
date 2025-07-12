import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

// Temporary force localhost:3000 for debugging
const baseUrl = 'http://localhost:3000';

console.log("🔧 HONO CLIENT - Post Login Debug:");
console.log("🔗 Using baseUrl:", baseUrl);

export const client = hc<AppType>(baseUrl);