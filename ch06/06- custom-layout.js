app.get('/custom-layout', (req, res) =>
    res.render('custom-layout', { layout: 'custom' })
)