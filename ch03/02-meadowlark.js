const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.use(express.static(__dirname + '/public'))
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
   ]

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
 defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')
app.get('/', (req, res) => res.render('home'))
app.get('/about',(req,res) => {
    res.render('about');
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', { fortune: randomFortune });
})
// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})
// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})
