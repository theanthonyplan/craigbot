var redis = require('redis');                                   // Get Redis
var sub = redis.createClient(), pub = redis.createClient();     // Get pub and sub objects
var sleep = require('sleep').sleep;                             // So we don't uberspawn
var SLEEP_DURATION = 5;                                         // Number of seconds to sleep

                                                                // Initialize some parameters for later:
var category = 'jjj';                                           // Set as default for now, pass to argv(todo)
var query = process.argv[2];                                    // Get the search query passed in as an arg
var baseCmd = 'node ./search.js ' + category +' '+ query + ' '; // Build a command to execute
var options = {                                                 // configure options here
    timeout: 30000                                              // REF: https://nodejs.org/api/child_process.htm
};                                                              // note there's an option for encoding (if you need it)
var child_threads = [];             // maybe lose this shit
var child_thread_count = 0;         // was good for testing

function startPull(){                                       // This is where it all begins..
    var exec = require('child_process').exec;               // Create the child process creator
    sub.hget('craigbot', 'cities', function(err, cities){   // get the city data from redis
        var max = cities.length;                            // number of cities to pull
        cities = JSON.parse(cities);                        // parse the city obj string as json
        console.log("Pulling data from "+ max + " cities..");           // Declare your intent, bot!
        cities.forEach(function(city, i){                               // Ok then, so for each city..
            child_thread_count = child_thread_count + 1;                // increment the count (depreciated)
            console.log("Pull " + (i+1)+"/"+ max +": " + city.city_name + "...");   // Keep me informed plz
            sleep(SLEEP_DURATION);       // start off slow, yo                      // Take a nap, or get banned trying
            var command = baseCmd + city.city_name ;                                // Finish building the command
            exec(command, function(error, stdout, stderr) {           // Create a new child process (inside loop still)
                child_thread_count = child_thread_count - 1;          // Start of Callback, called after exec completes
                console.log('stdout: ', stdout);                      // remap out
                console.log('stderr: ', stderr);                      // remap in
                if (error !== null) {                                 // if anything went wrong
                    console.log('exec error: ', error);               // log the error
                };                                                    // take a breath
                console.log("Threads: " + child_thread_count );       // log final thread count (depreciated)
            });                                                       // End of exec Callback
        });                                                           // End of Cities loop
    });                                                               // End of redis GET callback
};                                                                    // End of StartPull()

startPull();                         // start the pull
sub.quit();                         // shut it down..
pub.quit();                        // shut it all d

