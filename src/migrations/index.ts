import * as migration_20260316_141145_initial from './20260316_141145_initial'
import * as migration_20260316_141257_rename_posts_to_articles from './20260316_141257_rename_posts_to_articles'
import * as migration_20260317_131609_add_article_section_field from './20260317_131609_add_article_section_field'
import * as migration_20260318_120000_add_search_reading_time_fields from './20260318_120000_add_search_reading_time_fields'

export const migrations = [
  {
    up: migration_20260316_141145_initial.up,
    down: migration_20260316_141145_initial.down,
    name: '20260316_141145_initial',
  },
  {
    up: migration_20260316_141257_rename_posts_to_articles.up,
    down: migration_20260316_141257_rename_posts_to_articles.down,
    name: '20260316_141257_rename_posts_to_articles',
  },
  {
    up: migration_20260317_131609_add_article_section_field.up,
    down: migration_20260317_131609_add_article_section_field.down,
    name: '20260317_131609_add_article_section_field',
  },
  {
    up: migration_20260318_120000_add_search_reading_time_fields.up,
    down: migration_20260318_120000_add_search_reading_time_fields.down,
    name: '20260318_120000_add_search_reading_time_fields',
  },
]
