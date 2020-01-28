const result = require('dotenv').config();
if (result.error) {
  throw result.error
}
 
const server = require('./src/server');
server.default.listen(3000);