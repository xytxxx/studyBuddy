var fs = require('fs');
var redis = require('redis');
var redisClient = redis.createClient();
var _ = require('lodash');
redisClient.on("error", function(err){
    console.error("error: " + err);
});

redisClient.on("ready", ()=>{
    var data = fs.readFileSync()
})


 