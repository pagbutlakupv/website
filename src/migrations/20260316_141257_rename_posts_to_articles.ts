import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_posts_status" RENAME TO "enum_articles_status";
  ALTER TYPE "public"."enum__posts_v_version_status" RENAME TO "enum__articles_v_version_status";
  ALTER TABLE "posts_populated_authors" RENAME TO "articles_populated_authors";
  ALTER TABLE "posts" RENAME TO "articles";
  ALTER TABLE "posts_rels" RENAME TO "articles_rels";
  ALTER TABLE "_posts_v_version_populated_authors" RENAME TO "_articles_v_version_populated_authors";
  ALTER TABLE "_posts_v" RENAME TO "_articles_v";
  ALTER TABLE "_posts_v_rels" RENAME TO "_articles_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "articles_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "_articles_v_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "redirects_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "search_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "header_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "footer_rels" RENAME COLUMN "posts_id" TO "articles_id";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "articles_populated_authors" DROP CONSTRAINT "posts_populated_authors_parent_id_fk";
  
  ALTER TABLE "articles" DROP CONSTRAINT "posts_hero_image_id_media_id_fk";
  
  ALTER TABLE "articles" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "posts_rels_parent_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "posts_rels_categories_fk";
  
  ALTER TABLE "articles_rels" DROP CONSTRAINT "posts_rels_users_fk";
  
  ALTER TABLE "_articles_v_version_populated_authors" DROP CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk";
  
  ALTER TABLE "_articles_v" DROP CONSTRAINT "_posts_v_parent_id_posts_id_fk";
  
  ALTER TABLE "_articles_v" DROP CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_articles_v" DROP CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_posts_v_rels_parent_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_posts_v_rels_categories_fk";
  
  ALTER TABLE "_articles_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'articles'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('articles');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'articles'::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'articles'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('articles');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'articles'::"public"."enum__pages_v_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "posts_populated_authors_order_idx";
  DROP INDEX "posts_populated_authors_parent_id_idx";
  DROP INDEX "posts_hero_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  DROP INDEX "posts_slug_idx";
  DROP INDEX "posts_updated_at_idx";
  DROP INDEX "posts_created_at_idx";
  DROP INDEX "posts__status_idx";
  DROP INDEX "posts_rels_order_idx";
  DROP INDEX "posts_rels_parent_idx";
  DROP INDEX "posts_rels_path_idx";
  DROP INDEX "posts_rels_posts_id_idx";
  DROP INDEX "posts_rels_categories_id_idx";
  DROP INDEX "posts_rels_users_id_idx";
  DROP INDEX "_posts_v_version_populated_authors_order_idx";
  DROP INDEX "_posts_v_version_populated_authors_parent_id_idx";
  DROP INDEX "_posts_v_parent_idx";
  DROP INDEX "_posts_v_version_version_hero_image_idx";
  DROP INDEX "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX "_posts_v_version_version_slug_idx";
  DROP INDEX "_posts_v_version_version_updated_at_idx";
  DROP INDEX "_posts_v_version_version_created_at_idx";
  DROP INDEX "_posts_v_version_version__status_idx";
  DROP INDEX "_posts_v_created_at_idx";
  DROP INDEX "_posts_v_updated_at_idx";
  DROP INDEX "_posts_v_latest_idx";
  DROP INDEX "_posts_v_autosave_idx";
  DROP INDEX "_posts_v_rels_order_idx";
  DROP INDEX "_posts_v_rels_parent_idx";
  DROP INDEX "_posts_v_rels_path_idx";
  DROP INDEX "_posts_v_rels_posts_id_idx";
  DROP INDEX "_posts_v_rels_categories_id_idx";
  DROP INDEX "_posts_v_rels_users_id_idx";
  DROP INDEX "redirects_rels_posts_id_idx";
  DROP INDEX "search_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_populated_authors" ADD CONSTRAINT "articles_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_version_populated_authors" ADD CONSTRAINT "_articles_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_parent_id_articles_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v" ADD CONSTRAINT "_articles_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_articles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_articles_v_rels" ADD CONSTRAINT "_articles_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_articles_id_idx" ON "pages_rels" USING btree ("articles_id");
  CREATE INDEX "_pages_v_rels_articles_id_idx" ON "_pages_v_rels" USING btree ("articles_id");
  CREATE INDEX "articles_populated_authors_order_idx" ON "articles_populated_authors" USING btree ("_order");
  CREATE INDEX "articles_populated_authors_parent_id_idx" ON "articles_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "articles_hero_image_idx" ON "articles" USING btree ("hero_image_id");
  CREATE INDEX "articles_meta_meta_image_idx" ON "articles" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles__status_idx" ON "articles" USING btree ("_status");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_articles_id_idx" ON "articles_rels" USING btree ("articles_id");
  CREATE INDEX "articles_rels_categories_id_idx" ON "articles_rels" USING btree ("categories_id");
  CREATE INDEX "articles_rels_users_id_idx" ON "articles_rels" USING btree ("users_id");
  CREATE INDEX "_articles_v_version_populated_authors_order_idx" ON "_articles_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_articles_v_version_populated_authors_parent_id_idx" ON "_articles_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_articles_v_parent_idx" ON "_articles_v" USING btree ("parent_id");
  CREATE INDEX "_articles_v_version_version_hero_image_idx" ON "_articles_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_articles_v_version_meta_version_meta_image_idx" ON "_articles_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_articles_v_version_version_slug_idx" ON "_articles_v" USING btree ("version_slug");
  CREATE INDEX "_articles_v_version_version_updated_at_idx" ON "_articles_v" USING btree ("version_updated_at");
  CREATE INDEX "_articles_v_version_version_created_at_idx" ON "_articles_v" USING btree ("version_created_at");
  CREATE INDEX "_articles_v_version_version__status_idx" ON "_articles_v" USING btree ("version__status");
  CREATE INDEX "_articles_v_created_at_idx" ON "_articles_v" USING btree ("created_at");
  CREATE INDEX "_articles_v_updated_at_idx" ON "_articles_v" USING btree ("updated_at");
  CREATE INDEX "_articles_v_latest_idx" ON "_articles_v" USING btree ("latest");
  CREATE INDEX "_articles_v_autosave_idx" ON "_articles_v" USING btree ("autosave");
  CREATE INDEX "_articles_v_rels_order_idx" ON "_articles_v_rels" USING btree ("order");
  CREATE INDEX "_articles_v_rels_parent_idx" ON "_articles_v_rels" USING btree ("parent_id");
  CREATE INDEX "_articles_v_rels_path_idx" ON "_articles_v_rels" USING btree ("path");
  CREATE INDEX "_articles_v_rels_articles_id_idx" ON "_articles_v_rels" USING btree ("articles_id");
  CREATE INDEX "_articles_v_rels_categories_id_idx" ON "_articles_v_rels" USING btree ("categories_id");
  CREATE INDEX "_articles_v_rels_users_id_idx" ON "_articles_v_rels" USING btree ("users_id");
  CREATE INDEX "redirects_rels_articles_id_idx" ON "redirects_rels" USING btree ("articles_id");
  CREATE INDEX "search_rels_articles_id_idx" ON "search_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "header_rels_articles_id_idx" ON "header_rels" USING btree ("articles_id");
  CREATE INDEX "footer_rels_articles_id_idx" ON "footer_rels" USING btree ("articles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_articles_status" RENAME TO "enum_posts_status";
  ALTER TYPE "public"."enum__articles_v_version_status" RENAME TO "enum__posts_v_version_status";
  ALTER TABLE "articles_populated_authors" RENAME TO "posts_populated_authors";
  ALTER TABLE "articles" RENAME TO "posts";
  ALTER TABLE "articles_rels" RENAME TO "posts_rels";
  ALTER TABLE "_articles_v_version_populated_authors" RENAME TO "_posts_v_version_populated_authors";
  ALTER TABLE "_articles_v" RENAME TO "_posts_v";
  ALTER TABLE "_articles_v_rels" RENAME TO "_posts_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "posts_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "_posts_v_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "redirects_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "search_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "header_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "footer_rels" RENAME COLUMN "articles_id" TO "posts_id";
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_articles_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_articles_fk";
  
  ALTER TABLE "posts_populated_authors" DROP CONSTRAINT "articles_populated_authors_parent_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "articles_hero_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "articles_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "articles_rels_parent_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "articles_rels_articles_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "articles_rels_categories_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "articles_rels_users_fk";
  
  ALTER TABLE "_posts_v_version_populated_authors" DROP CONSTRAINT "_articles_v_version_populated_authors_parent_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_articles_v_parent_id_articles_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_articles_v_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_articles_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_articles_v_rels_parent_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_articles_v_rels_articles_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_articles_v_rels_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_articles_v_rels_users_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_articles_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_articles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_articles_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_articles_fk";
  
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::text;
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_pages_blocks_archive_relation_to" USING "relation_to"::"public"."enum_pages_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::text;
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::"public"."enum__pages_v_blocks_archive_relation_to";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__pages_v_blocks_archive_relation_to" USING "relation_to"::"public"."enum__pages_v_blocks_archive_relation_to";
  DROP INDEX "pages_rels_articles_id_idx";
  DROP INDEX "_pages_v_rels_articles_id_idx";
  DROP INDEX "articles_populated_authors_order_idx";
  DROP INDEX "articles_populated_authors_parent_id_idx";
  DROP INDEX "articles_hero_image_idx";
  DROP INDEX "articles_meta_meta_image_idx";
  DROP INDEX "articles_slug_idx";
  DROP INDEX "articles_updated_at_idx";
  DROP INDEX "articles_created_at_idx";
  DROP INDEX "articles__status_idx";
  DROP INDEX "articles_rels_order_idx";
  DROP INDEX "articles_rels_parent_idx";
  DROP INDEX "articles_rels_path_idx";
  DROP INDEX "articles_rels_articles_id_idx";
  DROP INDEX "articles_rels_categories_id_idx";
  DROP INDEX "articles_rels_users_id_idx";
  DROP INDEX "_articles_v_version_populated_authors_order_idx";
  DROP INDEX "_articles_v_version_populated_authors_parent_id_idx";
  DROP INDEX "_articles_v_parent_idx";
  DROP INDEX "_articles_v_version_version_hero_image_idx";
  DROP INDEX "_articles_v_version_meta_version_meta_image_idx";
  DROP INDEX "_articles_v_version_version_slug_idx";
  DROP INDEX "_articles_v_version_version_updated_at_idx";
  DROP INDEX "_articles_v_version_version_created_at_idx";
  DROP INDEX "_articles_v_version_version__status_idx";
  DROP INDEX "_articles_v_created_at_idx";
  DROP INDEX "_articles_v_updated_at_idx";
  DROP INDEX "_articles_v_latest_idx";
  DROP INDEX "_articles_v_autosave_idx";
  DROP INDEX "_articles_v_rels_order_idx";
  DROP INDEX "_articles_v_rels_parent_idx";
  DROP INDEX "_articles_v_rels_path_idx";
  DROP INDEX "_articles_v_rels_articles_id_idx";
  DROP INDEX "_articles_v_rels_categories_id_idx";
  DROP INDEX "_articles_v_rels_users_id_idx";
  DROP INDEX "redirects_rels_articles_id_idx";
  DROP INDEX "search_rels_articles_id_idx";
  DROP INDEX "payload_locked_documents_rels_articles_id_idx";
  DROP INDEX "header_rels_articles_id_idx";
  DROP INDEX "footer_rels_articles_id_idx";
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}
