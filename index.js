const config = require('config');
const Joi = require('joi');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const genres = require('./routes/genres');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(helmet());
app.use('/api/genres', genres)

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Server Host: ' + config.get('mail.host'));
console.log('Server Host: ' + config.get('mail.password'));

// Teste para saber diferenciar a troca de environments (production/development/stage)
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
};

app.use(logger);

const port = process.env.PORT || 3000; 
app.listen(port, () => {console.log(`Listening on port ${port}...`)}); 