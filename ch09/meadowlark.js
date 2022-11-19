app.get("/", handlers.home);

app.get("/newsletter", handlers.newsletter);
app.post("/api/newsletter-signup", handlers.api.newsletterSignup);

app.get("/contest/vacation-photo", handlers.vacationPhotoContest);
app.get("/contest/vacation-photo-ajax", handlers.vacationPhotoContestAjax);
app.post("/contest/vacation-photo/:year/:month", (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err)
			return handlers.vacationPhotoContestProcessError(
				req,
				res,
				err.message
			);
		console.log("got fields: ", fields);
		console.log("and files: ", files);
		handlers.vacationPhotoContestProcess(req, res, fields, files);
	});
});
app.get(
	"contest/vacation-photo-thank-you",
	handlers.vacationPhotoContestProcessThankYou
);
app.post("/api/contest/vacation-photo/:year/:month", (req, res) => {
	const form = new multiparty.Form();
	form.parse(req, (err, fields, files) => {
		if (err)
			return handlers.api.vacationPhotoContestError(
				req,
				res,
				err.message
			);
		handlers.vacationPhotoContestProcess(req, res, fields, files);
	});
});

app.get("/newsletter-signup", handlers.newsletterSignup);
app.post("/newsletter-signup/process", handlers.newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", handlers.newsletterSignupThankYou);

app.use(handlers.notFound);
app.use(handlers.serverError);
