const express = require('express');
const app = express();
const port = 3000;
const controller = require('./controllers/usingAsyncAwait');
// const controller = require('./controllers/usingPromises');
// const controller = require('./controllers/usingThebables');

const path = require('path');
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/I/want/title/', controller);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});