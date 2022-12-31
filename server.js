const express = require('express')
const app = express()
const port = 3000;
const controller = require("./controllers/server")

app.get('/I/want/title', controller.get);


app.listen(port, () => console.log(`app listening on port ${port}!`))