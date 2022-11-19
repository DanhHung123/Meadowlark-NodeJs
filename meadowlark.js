// Express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Request library
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const multiparty = require("multiparty");
const cookieParserr = require("cookie-parser");
const expressSession = require("express-session");

// Request module
const { credentials } = require("./config");
const flashMiddleware = require("./lib/middleware/flash");
const handlers = require("./lib/handlers");
const weatherMiddleware = require("./lib/middleware/weather");

//Set file public path
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(weatherMiddleware);

// config Handlebars view engine
app.engine(
	"handlebars",
	engine({
		defaultLayout: "main",
		helpers: {
			section: function (name, options) {
				if (!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			},
		},
	})
);
app.set("view engine", "handlebars");
app.set("views", "./views");

// =================================================================
// ======= Run custom =======
// Chap 8
app.get("/", handlers.home);

app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err) return handlers.vacationPhotoContestProcessError(req,res,err.message);
        console.log('got fields: ', fields);
        console.log('and files: ', files);
		handlers.vacationPhotoContestProcess(req, res, fields, files);
	});
});
app.get('contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)
app.post("/api/contest/vacation-photo/:year/:month", (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err) return handlers.api.vacationPhotoContestError(req, res, err.message);
		handlers.vacationPhotoContestProcess(req, res, fields, files);
	});
});


app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.use(handlers.notFound);
app.use(handlers.serverError);

// ======= End run custom =======
// =================================================================

// Listen for port
app.listen(port, () => {
	console.log(
		`Express started on http://localhost:${port}` +
			` --> press Ctrl-C to terminate.`
	);
});
