import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage_hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Recrutez des talents grâce à la vidéo marque employeur' NOT NULL,
  	\`subheadline\` text DEFAULT 'Nous aidons les entreprises à attirer les meilleurs talents en racontant leur réalité à travers la vidéo.',
  	\`background_type\` text DEFAULT 'gradient',
  	\`background_image_id\` integer,
  	\`background_video_id\` integer,
  	\`overlay_opacity\` text,
  	\`gradient_colors_top_right\` text,
  	\`gradient_colors_bottom_left\` text,
  	\`gradient_colors_mid_left\` text,
  	\`gradient_colors_bottom_right\` text,
  	\`badge\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`scroll_label\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`background_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_hero\`("id", "headline", "subheadline", "background_type", "background_image_id", "background_video_id", "overlay_opacity", "gradient_colors_top_right", "gradient_colors_bottom_left", "gradient_colors_mid_left", "gradient_colors_bottom_right", "badge", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "scroll_label", "updated_at", "created_at") SELECT "id", "headline", 'Nous aidons les entreprises à attirer les meilleurs talents en racontant leur réalité à travers la vidéo.', 'gradient', "background_image_id", "background_video_id", "overlay_opacity", "gradient_colors_top_right", "gradient_colors_bottom_left", "gradient_colors_mid_left", "gradient_colors_bottom_right", "badge", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "scroll_label", "updated_at", "created_at" FROM \`homepage_hero\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_hero\` RENAME TO \`homepage_hero\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_background_image_idx\` ON \`homepage_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_background_video_idx\` ON \`homepage_hero\` (\`background_video_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_homepage_hero\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`background_image_id\` integer,
  	\`background_video_id\` integer,
  	\`overlay_opacity\` text DEFAULT 'medium',
  	\`gradient_colors_top_right\` text DEFAULT '#C9962A',
  	\`gradient_colors_bottom_left\` text DEFAULT '#8D5524',
  	\`gradient_colors_mid_left\` text DEFAULT '#4A2912',
  	\`gradient_colors_bottom_right\` text DEFAULT '#F5C842',
  	\`headline\` text DEFAULT 'A living catalog.' NOT NULL,
  	\`badge\` text DEFAULT 'New arrivals every week',
  	\`primary_cta_label\` text DEFAULT 'Browse the catalog',
  	\`primary_cta_href\` text DEFAULT '/shop',
  	\`secondary_cta_label\` text DEFAULT 'Learn more',
  	\`secondary_cta_href\` text DEFAULT '/about',
  	\`scroll_label\` text DEFAULT 'Scroll',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`background_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_homepage_hero\`("id", "background_image_id", "background_video_id", "overlay_opacity", "gradient_colors_top_right", "gradient_colors_bottom_left", "gradient_colors_mid_left", "gradient_colors_bottom_right", "headline", "badge", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "scroll_label", "updated_at", "created_at") SELECT "id", "background_image_id", "background_video_id", "overlay_opacity", "gradient_colors_top_right", "gradient_colors_bottom_left", "gradient_colors_mid_left", "gradient_colors_bottom_right", "headline", "badge", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "scroll_label", "updated_at", "created_at" FROM \`homepage_hero\`;`)
  await db.run(sql`DROP TABLE \`homepage_hero\`;`)
  await db.run(sql`ALTER TABLE \`__new_homepage_hero\` RENAME TO \`homepage_hero\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`homepage_hero_background_image_idx\` ON \`homepage_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`homepage_hero_background_video_idx\` ON \`homepage_hero\` (\`background_video_id\`);`)
}
