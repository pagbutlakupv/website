import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "search" ADD COLUMN "reading_time_minutes" numeric;
  CREATE TABLE "search_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  ALTER TABLE "search_populated_authors" ADD CONSTRAINT "search_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "search_published_at_idx" ON "search" USING btree ("published_at");
  CREATE INDEX "search_reading_time_minutes_idx" ON "search" USING btree ("reading_time_minutes");
  CREATE INDEX "search_populated_authors_order_idx" ON "search_populated_authors" USING btree ("_order");
  CREATE INDEX "search_populated_authors_parent_id_idx" ON "search_populated_authors" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "search_populated_authors" CASCADE;
  DROP INDEX "search_published_at_idx";
  DROP INDEX "search_reading_time_minutes_idx";
  ALTER TABLE "search" DROP COLUMN "published_at";
  ALTER TABLE "search" DROP COLUMN "reading_time_minutes";`)
}
