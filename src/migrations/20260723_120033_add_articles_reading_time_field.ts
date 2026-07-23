import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" ADD COLUMN "reading_time_minutes" numeric;
  ALTER TABLE "_articles_v" ADD COLUMN "version_reading_time_minutes" numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DROP COLUMN "reading_time_minutes";
  ALTER TABLE "_articles_v" DROP COLUMN "version_reading_time_minutes";`)
}
