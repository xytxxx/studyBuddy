var fs = require('fs');
var redis = require('redis');
var redisClient = redis.createClient();
var _ = require('lodash');
var uuid = require('uuid/v1');
const {promisify} = require('util');
const hgetAsync = promisify(redisClient.hget).bind(redisClient);
const hsetAsync = promisify(redisClient.hset).bind(redisClient);


/**
 * student has the format:
 *   {
    "name": "Peter Pan",
    "userId": "neverland",
    "courses": [
      "GEOG 181",
      "GEOG 187",
      "ENVS 178",
      "CS 115",
      "MATH 114"
    ],
    "password": "password"
  },
 */

redisClient.on("error", function(err){
    console.error("error: " + err);
});

function getNewUUID() {
    return uuid();
}

redisClient.on("ready", ()=>{
    var data = fs.readFileSync('students.1.json');
    var students = JSON.parse(data);
    var uuid = getNewUUID();
    for (var student of students) {
        hsetAsync('students', uuid, JSON.stringify(student)); 
        hsetAsync('idLookUp', student.userId, uuid);
    }
})

/**
 * @param {*} student 
 */
async function register (student) {
    var uuid = getNewUUID();
    hsetAsync('students', uuid, JSON.stringify(student));
    hsetAsync('idLookUp', student.userId, uuid);
    return uuid;
}

async function login (userId, password) {
    try {
        var uuid = await hgetAsync('idLookUp', userId);
        var student = JSON.parse(await hgetAsync('students', uuid));

        if (password === student.password) {
            return uuid;
        }
        return '';
    } catch (e) {
        return '';
    }
}

async function updateProfile (uuid, updatedStudent) {
    hsetAsync('students', uuid, JSON.stringify(updatedStudent));
}

async function getProfile (uuid) {
    var str = await hgetAsync('students', uuid);
    var student = JSON.parse(str);
    return _.pick(student, ['name', 'courses']);
}



module.exports = {
    register: register,
    login: login,
    getProfile: getProfile,
    updateProfile: updateProfile
}
 