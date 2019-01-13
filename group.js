var fs = require('fs');
var redis = require('redis');
var redisClient = redis.createClient();

redisClient.on("error", function(err){
    console.error("error: " + err);
})

function addToQueue (uuid, date) {
    
}