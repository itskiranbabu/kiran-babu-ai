-- ============================================
-- KEYSPARK AI - COMPLETE DATABASE SETUP
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL CHECK (category IN ('coach', 'agency', 'real_estate', 'creator', 'local_business')),
  title TEXT NOT NULL,
  outcome TEXT NOT NULL,
  description TEXT,
  starting_price INTEGER,
  timeline_days INTEGER,
  deliverables JSONB DEFAULT '[]'::jsonb,
  icon TEXT DEFAULT '⚡',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. FAQS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT DEFAULT 'general',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. PROJECT BLUEPRINTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS project_blueprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id UUID,
  service_category TEXT,
  intake_answers JSONB DEFAULT '{}'::jsonb,
  blueprint_data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. AUTOMATION RECIPES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS automation_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  trigger TEXT NOT NULL,
  actions JSONB NOT NULL DEFAULT '[]'::jsonb,
  tools JSONB NOT NULL DEFAULT '[]'::jsonb,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category TEXT DEFAULT 'general',
  estimated_time TEXT DEFAULT '30 min',
  popularity INTEGER DEFAULT 0,
  is_global BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_public ON faqs(is_public);
CREATE INDEX IF NOT EXISTS idx_blueprints_user ON project_blueprints(user_id);
CREATE INDEX IF NOT EXISTS idx_blueprints_status ON project_blueprints(status);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON automation_recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON automation_recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_global ON automation_recipes(is_global);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_blueprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_recipes ENABLE ROW LEVEL SECURITY;

-- Services: Public read, admin write
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Services are insertable by authenticated users"
  ON services FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- FAQs: Public read, admin write
CREATE POLICY "Public FAQs are viewable by everyone"
  ON faqs FOR SELECT
  USING (is_public = true);

CREATE POLICY "FAQs are insertable by authenticated users"
  ON faqs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Blueprints: Users can only see their own
CREATE POLICY "Users can view their own blueprints"
  ON project_blueprints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own blueprints"
  ON project_blueprints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blueprints"
  ON project_blueprints FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blueprints"
  ON project_blueprints FOR DELETE
  USING (auth.uid() = user_id);

-- Recipes: Global recipes viewable by all, users can see their own
CREATE POLICY "Global recipes are viewable by everyone"
  ON automation_recipes FOR SELECT
  USING (is_global = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert their own recipes"
  ON automation_recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recipes"
  ON automation_recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recipes"
  ON automation_recipes FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA - SERVICES
-- ============================================
INSERT INTO services (category, title, outcome, description, starting_price, timeline_days, deliverables, icon) VALUES
('coach', 'Coaching Funnel System', 'Turn cold Instagram followers into booked calls', 'Complete automated funnel that converts social media followers into paying coaching clients. Includes lead magnet, email nurture sequence, booking automation, and payment processing.', 2997, 14, '["High-converting landing page", "Lead magnet + delivery automation", "7-email nurture sequence", "Calendly booking integration", "Stripe payment setup", "CRM automation"]'::jsonb, '🎯'),

('agency', 'Agency Client Portal', 'Automate client onboarding & course delivery', 'Custom client portal with project management, file sharing, automated workflows, and white-label branding. Reduce onboarding time by 80%.', 4997, 21, '["Custom branded portal", "Project management dashboard", "File sharing & collaboration", "Automated onboarding workflow", "Client communication hub", "Analytics & reporting"]'::jsonb, '🚀'),

('real_estate', 'Property Lead System', 'Convert real estate inquiries into site visits automatically', 'Automated lead capture and nurture system for real estate professionals. Capture leads from multiple sources and automatically schedule property viewings.', 1997, 10, '["Property listing pages", "Lead capture forms", "WhatsApp/SMS automation", "Viewing scheduler", "CRM integration", "Follow-up sequences"]'::jsonb, '🏠'),

('creator', 'Creator Monetization Hub', 'Generate qualified leads while you sleep', 'Complete monetization system for content creators. Sell digital products, courses, and memberships with automated delivery and customer management.', 3497, 18, '["Product sales pages", "Course platform", "Membership portal", "Payment processing", "Email automation", "Analytics dashboard"]'::jsonb, '💎'),

('local_business', 'Local Business Growth System', 'Scale revenue without hiring more staff', 'Automated marketing and operations system for local businesses. Capture leads, manage appointments, process payments, and follow up automatically.', 2497, 12, '["Google My Business optimization", "Booking system", "Review automation", "Local SEO setup", "SMS marketing", "Customer database"]'::jsonb, '🏪');

-- ============================================
-- SEED DATA - FAQS
-- ============================================
INSERT INTO faqs (category, question, answer, is_public, display_order) VALUES
('services', 'What platforms do you build websites and funnels on?', 'We build production-grade applications using Next.js, React, Tailwind CSS, Supabase/Postgres for the database, Stripe for billing, and integrate with tools like Notion, Make/Zapier, Airtable, and HubSpot. We do not use demo builders or templates - everything is custom-built for your specific needs.', true, 1),

('services', 'How does the AI copilot actually help my business?', 'The AI Copilot learns your niche, offers, and current tools. It can design complete funnels, generate marketing copy, build automation workflows, and push tasks directly into your workspace. Think of it as having a business strategist, copywriter, and systems architect available 24/7. It ensures you are never staring at a blank page wondering what to do next.', true, 2),

('services', 'Is this a real SaaS or just a demo?', 'This is a real, production SaaS product. Everything is backed by a live database, Stripe subscriptions, and integrations with the tools you already use. Demo data is only used for onboarding walkthroughs to help you understand the features. Once you connect your accounts, all data is real and synced in real-time.', true, 3),

('services', 'How long does it take to launch my project?', 'Typically 7-21 days depending on complexity. The AI Blueprint Generator gives you a concrete plan and timeline after a 5-minute intake form. Simple funnels can be ready in 7-10 days, while complex client portals or multi-platform integrations may take 14-21 days. We provide weekly progress updates throughout.', true, 4),

('pricing', 'What is included in each plan?', 'Starter ($97/mo): 1 active project, 10 automation recipes, basic AI features. Pro ($197/mo): 5 active projects, unlimited automations, advanced AI, priority support. Agency ($497/mo): Unlimited projects, white-label options, dedicated account manager, custom integrations.', true, 5),

('technical', 'Can I integrate with my existing tools?', 'Yes! We integrate with 100+ tools including Calendly, Stripe, Notion, HubSpot, Mailchimp, Zapier, Make, Airtable, Google Workspace, Slack, and more. If you use a tool with an API, we can likely integrate it. Custom integrations are available on Pro and Agency plans.', true, 6),

('technical', 'Do I need technical knowledge to use this?', 'No technical knowledge required. The AI Copilot guides you through everything in plain language. However, if you want to customize code or build advanced automations, you have full access to do so. We provide both no-code and full-code flexibility.', true, 7),

('support', 'What kind of support do you provide?', 'Starter: Email support (24-48h response). Pro: Priority email + live chat (4-8h response). Agency: Dedicated account manager + Slack channel (1-2h response). All plans include access to our knowledge base, video tutorials, and community forum.', true, 8);

-- ============================================
-- SEED DATA - AUTOMATION RECIPES (GLOBAL)
-- ============================================
INSERT INTO automation_recipes (title, description, trigger, actions, tools, difficulty, category, estimated_time, popularity, is_global) VALUES
('Auto-onboard new coaching clients from Calendly + Stripe', 'Automatically onboard new clients when they book a call and make payment', 'New Calendly booking + Stripe payment confirmed', '[{"step": 1, "action": "Create client record in CRM"}, {"step": 2, "action": "Send welcome email with onboarding checklist"}, {"step": 3, "action": "Add to Notion client database"}, {"step": 4, "action": "Schedule automated follow-up emails"}, {"step": 5, "action": "Send Slack notification to team"}]'::jsonb, '["Calendly", "Stripe", "Make.com", "Gmail", "Notion", "Slack"]'::jsonb, 'intermediate', 'onboarding', '30 min setup', 95, true),

('Send WhatsApp reminders for property visits', 'Automatically remind clients about upcoming property viewings via WhatsApp', 'Property viewing scheduled in calendar', '[{"step": 1, "action": "Send WhatsApp reminder 24h before"}, {"step": 2, "action": "Send WhatsApp reminder 2h before"}, {"step": 3, "action": "Send property details and directions"}, {"step": 4, "action": "Log interaction in CRM"}]'::jsonb, '["Google Calendar", "Twilio WhatsApp", "Make.com", "CRM"]'::jsonb, 'beginner', 'follow_up', '20 min setup', 88, true),

('Sync Instagram leads to Notion CRM + email follow-up', 'Capture Instagram DM leads and automatically add to CRM with email sequence', 'New Instagram DM with keyword', '[{"step": 1, "action": "Extract lead info from DM"}, {"step": 2, "action": "Create lead in Notion CRM"}, {"step": 3, "action": "Add to email nurture sequence"}, {"step": 4, "action": "Send auto-reply on Instagram"}, {"step": 5, "action": "Notify sales team"}]'::jsonb, '["Instagram", "Notion", "ConvertKit", "Make.com"]'::jsonb, 'intermediate', 'lead_gen', '45 min setup', 92, true),

('Abandoned cart recovery sequence', 'Automatically follow up with customers who abandon their cart', 'Cart abandoned for 1 hour', '[{"step": 1, "action": "Send reminder email after 1 hour"}, {"step": 2, "action": "Send discount offer after 24 hours"}, {"step": 3, "action": "Send final reminder after 48 hours"}, {"step": 4, "action": "Remove from sequence if purchase completed"}]'::jsonb, '["Shopify/WooCommerce", "Klaviyo", "Stripe"]'::jsonb, 'beginner', 'payment', '25 min setup', 90, true),

('Auto-publish blog to multiple platforms', 'Publish new blog posts to Medium, Dev.to, and social media automatically', 'New blog post published on website', '[{"step": 1, "action": "Cross-post to Medium"}, {"step": 2, "action": "Cross-post to Dev.to"}, {"step": 3, "action": "Share on Twitter with summary"}, {"step": 4, "action": "Share on LinkedIn"}, {"step": 5, "action": "Add to content calendar"}]'::jsonb, '["WordPress/Ghost", "Medium API", "Dev.to API", "Twitter API", "LinkedIn API", "Zapier"]'::jsonb, 'advanced', 'content', '60 min setup', 78, true),

('Sync new customers to CRM and accounting', 'Keep customer data synchronized across all business tools', 'New customer created in Stripe', '[{"step": 1, "action": "Create customer in HubSpot CRM"}, {"step": 2, "action": "Create customer in QuickBooks"}, {"step": 3, "action": "Add to email marketing list"}, {"step": 4, "action": "Send welcome email"}]'::jsonb, '["Stripe", "HubSpot", "QuickBooks", "Mailchimp", "Zapier"]'::jsonb, 'intermediate', 'crm', '35 min setup', 85, true);

-- ============================================
-- ENABLE REAL-TIME FOR TABLES
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE services;
ALTER PUBLICATION supabase_realtime ADD TABLE faqs;
ALTER PUBLICATION supabase_realtime ADD TABLE project_blueprints;
ALTER PUBLICATION supabase_realtime ADD TABLE automation_recipes;

-- ============================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blueprints_updated_at BEFORE UPDATE ON project_blueprints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON automation_recipes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMPLETE! DATABASE READY FOR PRODUCTION
-- ============================================
