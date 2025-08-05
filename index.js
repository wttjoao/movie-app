const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: 'terror'},
    {id: 2, name: 'plotwist'},
    {id: 3, name: 'love'},
    {id: 4, name: 'comedy'},
    {id: 5, name: 'action'}
];

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found!');
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const schema = {
        name: Joi.string().required()
    };

    const result = Joi.validate(req.body, schema);

    if (result.error) return res.status(400).send(result.error.details[0].message);
        
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found!');

    const schema = {
        name: Joi.string().required()
    };

    const result = Joi.validate(req.body, schema);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found!');

    const index = genres.indexOf(genre);
    genres.splice(index);

    res.send(genre);
});

const port = process.env.PORT || 3000; 
app.listen(port, () => {console.log(`Listening on port ${port}...`)}); 