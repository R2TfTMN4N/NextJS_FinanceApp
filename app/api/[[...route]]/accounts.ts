import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import {eq} from "drizzle-orm"
import {createId} from "@paralleldrive/cuid2"
// import { error } from "console";
import {zValidator} from "@hono/zod-validator"

const app = new Hono()
.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({error:"Unauthorized"},401)
  //   throw new HTTPException(401, {
  //     res: c.json({ error: "Unauthorized" }, 401),
  //   });
   }

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name,
    })
    .from(accounts)
    .where(eq(accounts.userId,auth.userId));
  return c.json({ data });

})
.post(
  "/",
  clerkMiddleware(),
  zValidator("json",insertAccountSchema.pick({
    name:true,
  })),
  async (c)=>{
    console.log("🔐 POST /accounts - Starting...");
    
    const auth=getAuth(c);
    console.log("👤 Auth:", auth);
    
    const values=c.req.valid("json");
    console.log("📝 Validated values:", values);
    
    if(!auth?.userId){
      console.log("❌ Unauthorized - no userId");
      return c.json({error:"Unauthorized"},401)
    }
    
    try {
      console.log("💾 Inserting into database...");
      const [data]=await db.insert(accounts).values({
        id:createId(),
        userId:auth.userId,
        ...values
      }).returning();
      
      console.log("✅ Database insert successful:", data);
      return c.json({data});
    } catch (error) {
      console.log("💥 Database error:", error);
      return c.json({error: "Database error"}, 500);
    }

  }
)
export default app;
