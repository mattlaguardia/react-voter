var express = require('express');

var app = express();

// static is middleware //
app.use(express.static('./public'));
// static middleware for bootstrap //
app.use(express.static('./node_modules/bootstrap/dist'));

app.listen(3000);
console.log("App Server is running on port: 3000");
