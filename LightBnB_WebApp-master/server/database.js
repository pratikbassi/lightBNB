const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg')

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE  $1 = users.email
  `, [email.toLowerCase()])
  .then(res => res.rows[0])
  .catch(err => user = null);

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE  $1 = users.id
  `, [id])
  .then(res => res.rows[0])
  .catch(err => user = null);
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  let name = user.name;
  let email = user.email;
  let password = user.password;

  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [name, email, password])
  .then(res => res.rows[0]);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`
  SELECT reservations.*, properties.*, AVG(property_reviews.rating)
  FROM reservations 
  LEFT JOIN properties ON reservations.property_id = properties.id 
  LEFT JOIN property_reviews ON property_reviews.reservation_id = reservations.id 
  WHERE reservations.end_date < now()::date AND reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date desc
  LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties 
  LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
  `
  let queryParams = [limit]
  if (options.city) {
    if(queryParams.length > 1) {
      queryParams.push(`${options.city}`);
      queryString += `AND city LIKE $${queryParams.length} `;
    } else {
      queryParams.push(`${options.city}`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }
  }
  if (options.owner_id) {
    if(queryParams.length > 1) {
      queryParams.push(options.owner_id);
      queryString += `AND properties.owner_id = $${queryParams.length} `;
    } else {
      queryParams.push(options.owner_id);
      queryString += `WHERE properties.owner_id = $${queryParams.length} `;
    }
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    if(queryParams.length > 1) {
      queryParams.push(parseFloat(options.minimum_price_per_night));
      queryParams.push(parseFloat(options.maximum_price_per_night));
      queryString += `AND properties.cost_per_night > $${queryParams.length - 1} `;
      queryString += `AND properties.cost_per_night < $${queryParams.length} `;
    } else {
      queryParams.push(parseFloat(options.minimum_price_per_night));
      queryParams.push(parseFloat(options.maximum_price_per_night));
      queryString += `WHERE properties.cost_per_night > $${queryParams.length - 1} `;
      queryString += `AND properties.cost_per_night < $${queryParams.length} `;

    }
  }
  queryString += `
  GROUP BY properties.id `
  if (options.minimum_rating) {
    queryParams.push(parseFloat(options.minimum_rating));
    queryString += `HAVING AVG(property_reviews.rating) > $${queryParams.length} `;
  } 
  
  
  
  queryString += `ORDER BY cost_per_night
  LIMIT $1;
  `;
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  let keys = Object.keys(property);
  let values = [];
  let dollars = [];
  let queryString = `INSERT INTO properties(`

  queryString += keys.join(', ')
  queryString += ') VALUES ($'

  let i = 1;
  for(let item of keys ) {
    dollars.push(`${i}`)
    values.push(property[item])
    i++;
  }
  queryString += dollars.join(', $')
  queryString += ') RETURNING *'

  console.log(queryString);
  return pool.query(queryString, values)
  .then(res => res.rows[0]);
}
exports.addProperty = addProperty;
