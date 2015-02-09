// Server
var express = require('express')
app = express()

var path = require('path');

app..use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);

app.route('/').get(function(req, res){
  res.render('library.html')
})

app.listen(3000)
console.log("listening on port 3000")
