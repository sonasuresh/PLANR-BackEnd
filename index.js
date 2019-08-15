const config = require('./config/config');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server is listening on : ${config.port} `);
});
