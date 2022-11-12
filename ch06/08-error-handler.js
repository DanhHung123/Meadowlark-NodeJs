app.use((err, req, res, next) => {
    console.error('** SERVER ERROR: ' + err.message)
    res.status(500).render('08-error',
    { message: "you shouldn't have clicked that!" })
})