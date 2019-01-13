var _ = require('lodash');

var dataBase = {};
var lookUpTable = {};

/**
 * determains if a person fits in group. CORE.
 * @param {object} student 
 * @param {object} group 
 */
function fitsInGroup (student, group) {
    if (group.members.length >= student.maxMembers) return false;
    if (group.members.length >= group.maxMembers) return false;
    let numOfCommonCourses = _.intersection(student.courses, group.courses).length;
    let totalNumberOfCourses = _.max(student.courses.length, group.courses.length);
    if (numOfCommonCourses / totalNumberOfCourses <= 0.7) return false;
    return true;
}

/**
 * adds student to group, return true if group is full
 * @param {*} student 
 * @param {*} group 
 */
function addToGroup (student, group) {
    group.members.push(student);
    group.maxMembers = _.min(student.maxMembers, group.maxMembers);
    
}

/**
 * adds a student to the pending student pool
 * @param {*} uuid 
 * @param {*} date 
 * @param {*} maxMembers 
 * @param {*} courses 
 */
async function addToPool (uuid, date, maxMembers, courses) {
    var pendingStudent = {
        uuid: uuid,
        maxMembers: maxMembers,
        courses: courses
    }
    if (!dataBase[date]) dataBase[date] = [];

    let foundFit = false;
    for (var i in  dataBase[date]) {
        var group = dataBase[date][i];
        if (fitsInGroup(pendingStudent, group)) {
            addToGroup (pendingStudent, group);
            //add path to student to lookUpTable
            if (!lookUpTable[uuid]) lookUpTable[uuid] = [];
            lookUpTable[uuid].push([date, i]);
            foundFit = true;
            break;
        }
    }
    //if not found, create new group
    if (!foundFit) {
        dataBase[date].push({
            maxMembers: maxMembers,
            courses: courses,
            members: [pendingStudent]
        })
    }
}

/**
 * gets the studeent's joined groups.
 * @param {*} uuid 
 */
async function joinedGroups(uuid) {
    var result = [];
    if (!lookUpTable[uuid]) return [];
    for (var path of lookUpTable[uuid]) {
        group = _.get(dataBase, path, {});
        result.push({
            date: path[0],
            courses: group.courses,
            group: _.map(group.members, 'uuid')
        }) 
    }
    return result;
}

/**
 * removes a student from pool given enough info 
 * @param {} uuid 
 * @param {*} date 
 * @param {*} courses 
 * @param {*} groupMembers 
 */
async function removeFromPool(uuid, date, courses, groupMembers) {
    groupMembers.push(uuid); //restore full group 
    groups = _.get(dataBase, date, []);
    for (var group of groups) {
        if (_.isEqual(group.members.sort(), groupMembers.sort()) && 
        _.isEqual(group.courses.sort(), courses.sort())) {
            _.pull(group.members, uuid);
        }
    }
}

module.exports = {
    getJoinedGroups: joinedGroups,
    addToPool: addToPool,
    removeFromPool: removeFromPool
}