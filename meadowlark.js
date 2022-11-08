import express from 'express';
import { engine } from 'express-handlebars';
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
   ]

// config Handlebars view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get('/', (req,res) => {
    res.render('home');

})
app.get('/about',(req,res) => {
    res.render('about');
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', { fortune: randomFortune });
})


// custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');

})

// custom 500 page
app.use(function(err,req, res, next) {
    console.log(err.message);
    res.status(500);
    res.render('500');

})

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`);
})