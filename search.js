var category = process.argv[2];                      // Get the command args from process.argv
var query = process.argv[3];                         // that must be passed in from the
var city = process.argv[4];                          // shell or invoking script

var redis = require('redis').createClient();         // Redis client creation

console.log('recieved category: '                   // Log the provided input
    + category                                     // This is not the best codestyle to expand shit like
    +' |recieved query: ' + query                 // this but sometimes it helps keep things neat
    +' |recieved city: ' + city);                // so that they remain easily commentable.

var craigslist = require('node-craigslist'),      // Import our craigslist api module
    client = new craigslist.Client({             // Create a new client to handle our requests
        city : city                             // Initialize it with whatever city was passed as input
    });                                        // REF: https://github.com/brozeph/node-craigslist

var options = {                                // We can set any other special search options here
    category : category                        // for now lets just set the category passed as the first input arg
};                                             // Theres a ton of options available.  Check out the last REF link for more.

client                                         // Ok little one, here's what i want from you:
    .search(options, query)                    // First I want you to pull the CL data using these options and this query
    .then((listings) => {                      // THEN, once that thats finished lets saving the results as "listings"
        // play with listings here...          // and when that's ready, I want you to take "listings" (a list of objs)
        listings.forEach((listing) => console.log(listing));                        // and for each listing, log it to console
        redis.hset("cb.pull."+category+"."+query, city, JSON.stringify(listings));  // Finally, save the whole thing to the redis store
        redis.quit();                                                               // Close down your redis client
        process.exit();                                                             // And kill the process
}   )
    .catch((err) => {                                                               // If anything bad happens along the way
        console.error(err);                                                         // log the err to console
        process.exit();                                                             // and nuke the process just to be safe.
    });                                                                             // Thanks for the wild ride, bb!

