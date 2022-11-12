
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
const multiparty = require('multiparty')
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

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankYou)
