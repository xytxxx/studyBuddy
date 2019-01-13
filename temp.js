var fs = require('fs');
var data = fs. readFileSync('students.1.json');
var d = JSON.parse(data);

for (s of d ){
    s.password = 'password';

}

fs.writeFileSync('students.1.json', JSON.stringify(d));