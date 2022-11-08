app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Meadowlark Travel');
   })
app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Travel')
})
   // custom 404 page
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})