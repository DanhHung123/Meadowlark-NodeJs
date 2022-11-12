const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const cookiesParser = require('cookie-parser');
const session = require('express-session');
const catNames = require('cat-names');
const { reset } = require('nodemon');

app.use(express.static(__dirname +  '/public'));

app.engine('handlebars', engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookiesParser());
app.use(session({resave: false, saveUninitialized: false, secret: "keyboad cat"}))


var mess = new Date().getHours() < 12 ? "Good Morning" : "Good Night" ;

app.get('/', (req, res) => {
    res.render('home',{
        message: mess,
        color: req.query.color ?? 'No color',
        userid: req.cookies.userid,
        username: req.session.username,
    });
})

app.get('/set-random-userid', (req,res) => {
    res.cookie('userid',(Math.random()*10000).toFixed(0))
    res.redirect('/');
})

app.get('/set-random-username', (req,res) => {
    req.session.username = catNames.random();
    res.redirect('/');
})

app.listen(3000,() => {
    console.log("Listen on http://localhost:3000");
})