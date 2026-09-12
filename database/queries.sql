-- Nearby active professionals (use PostGIS in high-volume production).
SELECT id,display_name,professional_title,city,hourly_rate,availability,credential_status FROM professional_profiles WHERE status IS DISTINCT FROM 'SUSPENDED' AND city=$1 ORDER BY (availability='AVAILABLE_NOW') DESC,rating_average DESC LIMIT 50;
-- Compliance expiration queue.
SELECT id,professional_id,type,provider,expiration_date,status FROM credentials WHERE status='VERIFIED' AND expiration_date<=CURRENT_DATE+INTERVAL '30 days' ORDER BY expiration_date;
-- Open gigs by market.
SELECT id,title,city,starts_at,budget,status FROM gigs WHERE city=$1 AND status='OPEN' ORDER BY starts_at NULLS LAST LIMIT 100;
-- Professional revenue/payable reconciliation target.
SELECT p.professional_id,SUM(p.amount) AS processor_amount,SUM(o.amount) FILTER(WHERE o.status='PAID') AS payout_amount FROM payment_records p LEFT JOIN payout_records o ON o.professional_id=(SELECT professional_id FROM bookings WHERE id=p.booking_id) GROUP BY p.professional_id;