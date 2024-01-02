const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const { URLs } = require('./models');

app.use(express.static(path.join(__dirname, '..', 'FrontEnd', 'dist')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..',  'FrontEnd', 'dist', 'index.html'));
});

app.get('/healthCheck', (req, res) => {
    res.status(200).send('OK');
});

app.get('/available/:shortened', (req, res) => {
    const { shortened } = req.params;
    URLs.findOne({
        where: {
            shortened
        }
    }).then((result) => {
        if (result === null) {
            res.send(true);
        } else {
            res.send(false);
        }
    });
});

app.post('/register', async (req, res) => {
    const { shortened, link } = req.body;
    const url = await URLs.create({
        shortened,
        link
    });
    res.send(url);
});

app.get('/decode/:shortened', (req, res) => {
    const { shortened } = req.params;
    URLs.findOne({
        where: {
            shortened
        }
    }).then((result) => {
        if (result === null) {
            res.status(404).send('Not Found');
        } else {
            res.send(result);
        }
    });
});

app.get('/:shortened', (req, res) => {
    const { shortened } = req.params;
    URLs.findOne({
        where: {
            shortened
        }
    }).then((result) => {
        if (result === null) {
            res.status(404).send('Not Found');
        } else {
            res.redirect(result.link);
        }
    });
});

app.listen(port);


