const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const compression = require('compression');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.disable('x-powered-by');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'mainLayout',
  }),
);

app.set('port', process.env.PORT || 7000);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(controllers);

module.exports = app;
