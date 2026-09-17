import { integer, pgTable, serial, text, timestamp, numeric } from 'drizzle-orm/pg-core';

// CEO Executive Metrics Table
export const ceoMetricsTable = pgTable('ceo_metrics', {
  id: serial('id').primaryKey(),
  monthlyRevenue: numeric('monthly_revenue', { precision: 12, scale: 2 }).notNull().default('2450000.00'),
  totalBookings: integer('total_bookings').notNull().default(184),
  activeCases: integer('active_cases').notNull().default(27),
  conversionRate: numeric('conversion_rate', { precision: 5, scale: 2 }).notNull().default('42.50'),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Google Workspace Integrated Records
export const workspaceSyncTable = pgTable('workspace_sync', {
  id: serial('id').primaryKey(),
  serviceName: text('service_name').notNull(), // 'Sheets', 'Drive', 'Gmail', 'Calendar', 'Docs', 'Slides', 'Tasks', 'Chat', 'Forms'
  lastSyncTime: timestamp('last_sync_time').defaultNow(),
  syncStatus: text('sync_status').notNull().default('Active'),
  syncedItemCount: integer('synced_item_count').default(0),
  details: text('details'),
});

// Local SEO & Google Maps Campaigns
export const seoCampaignsTable = pgTable('seo_campaigns', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  targetLocation: text('target_location').notNull(), // e.g. "Dubai & UAE", "Lahore & Pakistan"
  keyword: text('keyword').notNull(),
  googleMapRank: integer('google_map_rank').default(1),
  seoScore: integer('seo_score').default(98),
  status: text('status').notNull().default('Active'),
  lastAuditNotes: text('last_audit_notes'),
  createdAt: timestamp('created_at').defaultNow(),
});
