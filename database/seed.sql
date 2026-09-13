-- PRODUCTION REFERENCE CONFIGURATION ONLY.
-- Never seed synthetic users, providers, orders, bookings, reviews, ratings, payments, payouts or outcomes.
INSERT INTO service_categories(slug,name) VALUES
('personal-chef','Personal Chef'),
('meal-prep','Meal Preparation'),
('event-chef','Event Culinary Services'),
('culinary-staff','Culinary Staffing'),
('baking-pastry','Baking & Pastry') ON CONFLICT DO NOTHING;
INSERT INTO specialties(name) VALUES
('Southern'),('Seafood'),('Meal Prep'),('Private Dining'),('Events'),('Catering'),('Vegan'),('BBQ'),('Brunch'),('Pastry') ON CONFLICT DO NOTHING;
