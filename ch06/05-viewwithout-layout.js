

app.get('/no-layout', (req, res) =>
    res.render('no-layout', { layout: null })
)

