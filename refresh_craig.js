var cl = require('craigslist-utils');                           // Get an interface for the cl metadata
var redis = require('redis').createClient();                    // Get Redis
console.log("\n\nUPDATING CITIES");                             // Let me know wassup
var cities = cl.all_cities();                                    // Get all of the available cities in our index
redis.hmset("craigbot", "cities",  JSON.stringify(cities) );      // and save the whole structure to Redis
console.log("\n\nUPDATING CATEGORIES");                            // Don't be a stranger
var categories = require('craigslist-utils/constants').categories;  // Get the category index
redis.hmset("craigbot", "categories",  JSON.stringify(categories ) ); // Save the structure to Redis
redis.quit();                                                         // Close it down


