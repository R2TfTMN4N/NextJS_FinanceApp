import { Hono } from "hono";
import { handle } from "hono/vercel";
import accounts from "./accounts"
import categories from "./categories"
import transactions from "./transactions";
import summary from "./summary";
export const runtime = "edge";

const app = new Hono().basePath("/api");


const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)
  .route("/summary", summary)

export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH = handle(routes);
export const DELETE = handle(routes);

export type AppType = typeof routes