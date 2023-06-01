//variables to use express, handlebars, and set the port to 3000
const express = require('express');
// import express from 'express';
const path = require('path');
const app = express();
const port = 3000;
const handlebars = require('express-handlebars');

//login.set the engine to use handlebars
app.set('view engine', 'handlebars');

//layoutsDir directs app to folder layouts with files that are essential for handlebars
//add extension name for handlebars "handlebars"
app.engine('handlebars', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
}));

app.use(express.static('public'));

//render will direct the app to login.handlebars and index.handlebars
app.get('/', (req, res) => {
    res.render('main', {layouts: 'index'});
});

app.listen(port, () => {
    console.log('listening to port ${port}');
});