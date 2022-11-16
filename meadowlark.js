// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// Request library
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const multiparty = require('multiparty');
const cookieParserr = require('cookie-parser');
const expressSession = require('express-session');

// Request module
const { credentials } = require('./config');
const flashMiddleware = require('./lib/middleware/flash');
const handlers = require('./lib/handlers');

//Set file public path
app.use(express.static(__dirname + '/public'));

// config Handlebars view engine
app.engine('handlebars', engine( {defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');
app.set('views', './views');

// =================================================================
// ======= Run custom =======
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/newsletter', handlers.newsletter)

app.post('/api/newsletter-signup',handlers.api.newsletterSignup)

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).send({ error: err.message})
        handlers.vacationPhotoContestProcess(req, res, fields,files)
    })
})

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankYou)


// ======= End run custom =======
// =================================================================

// Listen for port
app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}` + ` --> press Ctrl-C to terminate.`);
})