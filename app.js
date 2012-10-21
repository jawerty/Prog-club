var express = require('express')
var stylus = require('stylus')
var nib = require('nib')

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})
app.get('/tutorials', function (req, res) {
  res.render('tutorials',
  { title : 'Tutorials' }
  )
})
app.get('/projects', function (req, res) {
  res.render('projects',
  { title : 'Projects' }
  )
})
app.listen(3000)
console.log("Listening on port 3000...")
