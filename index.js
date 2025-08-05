const express = require('express');
const app = express();

let genres = [
    {id: 1, name: 'terror'},
    {id: 2, name: 'plotwist'},
    {id: 3, name: 'romantic'},
    {id: 4, name: 'comedy'},
    {id: 5, name: 'action'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given id was not found!');
    res.send(genre);
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {console.log(`Listening on port ${port}...`)}); 