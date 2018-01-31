
// init project
var express = require('express')
var qwant = require('qwant-api')
var app = express()
app.use(express.static('public'))

// init database
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient

// Database address
var url = process.env.DB_ADDRESS

// APP usage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// Search images
app.get("/api/imagesearch/:query", function(req, res) {
  // Store search in history
  db.insert({
    term: req.params.query,
    when: new Date()
  })
  // Request search to qwant
  qwant.search("images", {
    query: req.params.query,
    count: 10,
    offset: req.query.offset,
    language: "english"
  }, function(err, data) {
    if(err) throw err
    // Format content
    var docs = data.data.result.items
    var newDocs = []
    docs.forEach(function(item) {
      var newItem = {
        url: item.media,
        snippet: item.title,
        thumbnail: item.thumbnail,
        context: item.url
      }
      newDocs.push(newItem)
    })
    res.send(newDocs)
  })
})
 
// Get last 10 queries
app.get("/api/latest/imagesearch/", function(req, res) {
  // Retrieve from database and respond
  db.find()
    .sort({when: -1})
    .limit(10)
    .toArray(function(err, docs) {
    if(err) throw err
    res.send(docs)
  })
})

// Initialize db 
var db
MongoClient.connect(url, function(err, client) {
  if(err) throw err
  db = client.db('imagesearcherfcc').collection('history')
  // Listen for requests :)
  var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port)
  })
})
