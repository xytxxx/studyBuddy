var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var groupService = require('./group.service')

router.use(bodyParser.json()); // for parsing application/json

router.get('/schedule/:uuid', async(req, res)=>{
    console.log('getting schedule for uuid '+ req.params.uuid );
    var result = {};
    try {
        result = await groupService.getJoinedGroups(req.params.uuid);
    } catch (e) {
        res.send([]);
    }
    res.send(result);
})

router.post('/schedule', async(req, res)=>{
    console.log('adding '+ req.body.uuid +' to pool for ' + req.body.date );
    var plan = req.body;
    try {
        await groupService.addToPool(plan.uuid, plan.date, plan.maxMembers, plan.courses);
    } catch (e) {
        res.sendStatus(400);
    }
    res.send();
})


router.delete('/schedule', async(req, res)=>{
    console.log('removing'+ req.body.uuid +' from pool for ' + req.body.date );
    var plan = req.body;
    try {
        await groupService.removeFromPool(plan.uuid, plan.date, plan.courses, plan.groupMembers);
    } catch (e) {
        res.sendStatus(400);
    }
    res.send();
})


module.exports = router;