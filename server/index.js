const express = require('express')

const app = express()


require('./routes/admin')(app)
require('./plugin/db')(app)

app.listen(3000, () => {
  console.log("http://localhost:3000!")
})

