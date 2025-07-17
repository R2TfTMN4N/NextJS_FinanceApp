import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { categories, insertCategorySchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq, inArray, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
// import { error } from "console";
// import { error } from "console";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
      //   throw new HTTPException(401, {
      //     res: c.json({ error: "Unauthorized" }, 401),
      //   });
    }

    const data = await db
      .select({
        id: categories.id,
        name: categories.name,
      })
      .from(categories)
      .where(eq(categories.userId, auth.userId));
    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Missing Id" }, 400);
      }
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name,
        })
        .from(categories)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)));
      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCategorySchema.pick({
        name: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .insert(categories)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();
      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const data = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            inArray(categories.id, values.ids)
          )
        )
        .returning({
          id: categories.id,
        });
      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertCategorySchema.pick({
        name: true,
      })
    ),

    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const [data] = await db
        .update(categories)
        .set(values)
        .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )

  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),

    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      console.log("DELETE /accounts/:id called");
      console.log("Auth userId:", auth?.userId);
      console.log("Account ID to delete:", id);

      if (!auth?.userId) {
        console.log("Unauthorized: no userId");
        return c.json({ error: "Unauthorized" }, 401);
      }

      if (!id) {
        console.log("Bad request: no id");
        return c.json({ error: "Missing id" }, 400);
      }

      try {
        const [data] = await db
          .delete(categories)
          .where(and(eq(categories.userId, auth.userId), eq(categories.id, id)))
          .returning({ id: categories.id });

        console.log("Delete result:", data);

        if (!data) {
        //   console.log("Account not found or not owned by user");
          return c.json({ error: "Not found" }, 404);
        }

        console.log("Account deleted successfully:", data);
        return c.json({ data });
      } catch (error) {
        console.error("Database error:", error);
        return c.json({ error: "Database error" }, 500);
      }
    }
  );
export default app;
