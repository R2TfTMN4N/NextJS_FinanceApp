ALTER TABLE "transactions" RENAME COLUMN "categories" TO "category_id";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_categories_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;