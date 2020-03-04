SELECT reservations.*, properties.*, AVG(property_reviews.rating)
FROM reservations 
LEFT JOIN properties ON reservations.property_id = properties.id 
LEFT JOIN property_reviews ON property_reviews.reservation_id = reservations.id 
WHERE reservations.end_date < now()::date AND reservations.guest_id = '1'
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date desc
LIMIT 10;