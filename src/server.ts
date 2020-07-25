import http from 'http';

import app from './App';

let config = require('../config/main'); // config file is not a module

let httpServer = new http.Server(app);

const port = process.env.PORT || config.port;
const server = httpServer.listen(port, function() {
  console.log('listening on *:', port);
});
