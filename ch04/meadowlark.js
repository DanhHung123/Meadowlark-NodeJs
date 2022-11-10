const express = require('express');
const app = express();
const fortuneCookies = require('./lib/fortune');

app.get('/about', (req,res) => {
    res.render('about',{fortune: fortuneCookies.getFortune()})
})