
// init project
var express = require('express')
var app = express()
app.use(express.static('public'))

// init database
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient

// Database address
var url = 'mongodb://sgomezpaz:mongodbimagesearcherfcc@ds117868.mlab.com:17868/imagesearcherfcc'

// APP usage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
