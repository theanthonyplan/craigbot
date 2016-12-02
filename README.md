# craigbot
first branch of the global craigslist fetch service.

## Installation

### First off you will need to make sure you have redist installed and running.
*Install the redis-server*

    $ sudo apt-get install redis-server

    
*If you want to do interactive debugging*

    $  sudo apt-get install redis-cli


*Make sure the server is running*

    $  sudo service redis-server restart


### Get the source
    $ git clone https://github.com/theanthonyplan/craigbot.git



### Install node dependencies.
    $  npm install


## Usage

### Populate Redis with the Craigslist metadata
    $  node refresh_craig.js


### Call the main script, passing in a string for the bot to query.



##Syntax
    $ node ./craigbot.js someStringToQuery

*NOTE: You do not need to place quotes around the query string*

###EXAMPLE: 
*Query the entire world for python job listings.*

    $  node ./craigbot.js Python
