import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "search" ADD COLUMN "published_at" timestamp(3) with time zone;
  ALTER TABLE "search" ADD COLUMN "reading_time_minutes" numeric;
  CREATE INDEX "search_published_at_idx" ON "search" USING btree ("published_at");
  CREATE INDEX "search_reading_time_minutes_idx" ON "search" USING btree ("reading_time_minutes");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "search_published_at_idx";
  DROP INDEX "search_reading_time_minutes_idx";
  ALTER TABLE "search" DROP COLUMN "published_at";
  ALTER TABLE "search" DROP COLUMN "reading_time_minutes";`)
}
