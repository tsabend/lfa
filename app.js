// Server
var express = require('express')
app = express()
// Require middleware for parsing json
// var bodyParser = require('body-parser')
// CORS
// var cors = require('cors')

// app.use(cors())
// app.use(bodyParser())

var path = require('path');

app.use(require('express-jsxtransform')())
  .use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);



app.route('/').get(function(req, res){
  res.render('library.html')
})

app.listen(3000)
console.log("listening on port 3000")
