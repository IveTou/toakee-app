var express = require('express')
var app = express()

app.use('/',express.static('public'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})
