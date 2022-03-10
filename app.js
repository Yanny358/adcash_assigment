const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DB_URL = `mongodb+srv://user:user@cluster0.370rj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL,
    {useUnifiedTopology: true, useNewUrlParser: true});

const app = express();

const categories = require('./routes/categories')
const products = require('./routes/products')

app.use(bodyParser.json());

app.use('/products', products)
app.use('/categories', categories);

app.use((req,res,next) => {
    const err = new Error('Not Found.....');
    err.status = 404;
    next(err);
});

app.use((err,req,res,next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});

const port = app.get('port') || 2022;

app.listen(port, () => console.log(`Server is listening on port ${port}`));