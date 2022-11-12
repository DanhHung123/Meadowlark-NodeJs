const express = require('express');
const { engine } = require('express-handlebars');
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
app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) 
                this._sections = {}
                
            this._sections[name] = options.fn(this)

            return null
        },
    },
}) );
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

app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}` + ` --> press Ctrl-C to terminate.`);
})