SELECT properties.city, COUNT(reservations.id)
FROM properties 
LEFT JOIN reservations ON properties.id = reservations.property_id
GROUP BY properties.city
ORDER BY COUNT(reservations.id) desc;