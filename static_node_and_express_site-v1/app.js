const express = require('express');
const app= express();
const path = require('path');
const dataJSON = require('./data.json').projects;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.locals = dataJSON;
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});