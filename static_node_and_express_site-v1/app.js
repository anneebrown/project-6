const express = require('express');
const path = require('path');
const dataJSON = require('./data.json').projects;
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false }))
app.set('view engine', 'pug');
app.use(express.static('public'));


//home rout
app.get('/', (req, res) => {
    res.locals.dataJSON = dataJSON;
    //console.log(dataJSON);
    res.render('index');
})

//about route
app.get('/about', (req, res) => {
    res.render('about');
})

//projects route, sends the user to the error handler if the project entered doesn't exist
app.get('/projects/:id', (req, res, next) => {
    const id = req.params.id; 
    console.log(id);
    if (id <= 4) {
    res.locals.dataJSON = dataJSON[`${id}`];
    res.render('project');
    } else {
        const err = new Error('Sorry, something went wrong!');
        err.status = 404;
        next(err);
    }
})

//error handler
app.use((req, res, next) => {
    const err = new Error('Sorry, something went wrong!');
    err.status = 404;
    next(err);
})

app.use( (err, req, res, next) => {
    res.locals.err = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error', err);
    next();
})


app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});