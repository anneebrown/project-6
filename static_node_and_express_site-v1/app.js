const express = require('express');
const path = require('path');
const dataJSON = require('./data.json').projects;
var bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false }))
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

app.get('/projects/:id', (req, res) => {
    const {id} = req.params.id; 
    console.log(dataJSON[7])
    if (dataJSON[`${id}`]) {
    res.locals.dataJSON = dataJSON[`${id}`];
    res.render('project');
    } else {
        (req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    }

    }
})

//   app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// })

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