app.delete('/api/tour/:id', (req, res) => {
    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))
    if(idx < 0) return res.json({ error: 'No such tour exists.'})
    tours.splice(idx, 1)
    res.json({ success: true })
})
   