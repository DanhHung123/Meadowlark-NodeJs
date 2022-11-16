
const bodyParser = require('body-parser')

const multiparty = require('multiparty')
app.use(bodyParser.urlencoded({ extended: true }))
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
