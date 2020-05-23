const express = require('express');
const path = require('path');
const dataJSON = require('/data.json');

app.set('view engine', 'pug');
app.use(express.static('public'))