const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.route');
const logger = require('./lib/logger');

const app = express();

app.use(
  morgan(':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :response-time ms - :user-agent', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }),
);
app.use(express.static('src/public'));
app.use(express.json());
app.set('view engine', 'ejs'); // usando o ejs como view engine
app.set('views', `${__dirname}/views`); // mudando a pasta das views
routes(app);

module.exports = app;
