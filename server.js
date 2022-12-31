const express = require('express')
const app = express()
const port = 3000;
const controller = require("./controllers/server")

app.get('/I/want/title', controller.get);


app.listen(port, () => console.log(`app listening on port ${port}!`))

// const fetch = require('node-fetch'),
//     express = require('express'),
//     app = express()



// app.listen(3000)