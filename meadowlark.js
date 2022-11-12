const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

app.use(express.static(__dirname + '/public'));
// config Handlebars view engine
app.engine('handlebars', engine( {defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');
app.set('views', './views');



// Run custom
const handlers = require('./lib/handlers');
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).send({ error: err.message})
        handlers.vacationPhotoContestProcess(req, res, fields,files)
    })
})

exports.vacationPhotoContestProcess = (req, res, fields,files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    res.redirect(303, '/contest/vacation-photo-thank-you')
}


app.post('/contest/vacation-photo/:year/:month', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(500).send({ error: err.message})
            handlers.vacationPhotoContestProcess(req, res, fields,files)
    })
})

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
     console.log('field data: ', fields)
     console.log('files: ', files)
     res.redirect(303, '/contest/vacation-photo-thank-you')
}

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankYou)


app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}` + ` --> press Ctrl-C to terminate.`);
})