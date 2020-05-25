const express = require('express');
const path = require('path');
const dataJSON = require('./data.json').projects;

const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.locals.dataJSON = dataJSON;
    //console.log(dataJSON[0].technologies[1]);
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/:id', (req, res) => {
    const { id } = req.params; 
    res.locals.dataJSON = dataJSON[`${id}`];
    //console.log(dataJSON[0])
    res.render('project');
})

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});