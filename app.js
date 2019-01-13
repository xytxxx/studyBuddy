var express = require ('express');
var studentRouter = require('./student.router');
var groupRouter = require('./group.router');


var app = express();

app.use ('/student', studentRouter);
app.use ('/study', groupRouter);
app.listen(3000);
console.log('server started');