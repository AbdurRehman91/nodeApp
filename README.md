
# Getting Started

## Installation
* To get the Node server running locally:
* Clone this repo
* Use command ``` npm install ``` to install all required dependencies
* Install and run postgres database locally
* run ``` node server.js ``` to start the node server

# Code Overview
## Application Structure
* server.js - The entry point to our application. This file defines our express server 
* script.js - K6 script to verify post requests/second
* controller/ - folder containing controllers of application
* models/ - models folder
* services/ - services folder

## Api Endpoints
* POST ``` localhost:8010/jobListing ``` (creating new object)
* POST BODY (example)
``` 
{
"title":"developer",
"company":"abc",
"location":"karachi",
"postDate":"4/22/2020",
"applyEmail":"work@abc.com",
"leaveType":"Monthly",
"trending":"true"
}

```
* GET ``` localhost:8010/api/jobListing/ ``` (get all objects)
* GET ``` localhost:8010/api/jobListing/list/trending?page=1&size=1 ``` (trendingJobs pagination)
* PUT ``` localhost:8010/jobListing/1 ``` (update request with POST body as above)
* DELETE ``` localhost:8010/jobListing/1 ``` (delete object)
