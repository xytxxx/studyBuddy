var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var studentService = require('./student.service')

router.use(bodyParser.json()); // for parsing application/json

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/register', async (req, res)=>{
    var student = req.body;
    var uuid = '';
    try {
        uuid = await studentService.register(student);
    } catch (e) {
        res.sendStatus(400);
    }
    res.status(200).send(uuid);
});

router.post('/login', async(req, res) => {
    var credential = req.body;
    console.log('logging in for ' + credential.userId + ', ' + credential.password);
    var uuid = '';
    try {
        uuid = await studentService.login(credential.userId, credential.password);
    } catch (e) {
        res.sendStatus(400);
    }
    res.status(200).send({uuid: uuid});
})

router.put('/profile/:uuid', async(req, res) => {
    var uuid = req.params.uuid;
    var student = req.body;
    console.log('updateing uuid ' + uuid + 'with');
    console.log (student);
    try {
        uuid = await studentService.updateProfile(uuid, student);
    } catch (e) {
        res.sendStatus(400);
    }
    res.status(200).send({uuid: uuid});
}) 

router.get('/profile/:uuid', async(req, res) => {
    var uuid = req.params.uuid;
    var student = {};
    console.log('getting uuid ' + uuid + 'for');
    try {
        student = await studentService.getProfile(uuid);
    } catch (e) {
        res.sendStatus(400);
    }
    console.log (student);
    res.status(200).send(student);
}) 


module.exports = router; 