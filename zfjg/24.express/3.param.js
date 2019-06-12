const express = require('./express');

const app = express();

app.get('/user',function (req, res) {
    console.log(req.query);     //  { name: 'zs', age: '18' }
    console.log(req.path);      //  /user
    console.log(req.hostname);  //  localhost
    console.log('ok');
});

// http://localhost:8086/user?name=zs&age=18
app.listen(8086)