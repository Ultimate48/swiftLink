const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const { URLs } = require('./models');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update with your client's origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { shortened, link } = req.body;
    URLs.create({
        shortened,
        link
    });
});

app.get('/:shortened', (req, res) => {
    const { shortened } = req.params;
    URLs.findOne({
        where: {
            shortened
        }
    }).then((result) => {
        const { link } = result;
        res.redirect(link);
    });
});

app.listen(port);


