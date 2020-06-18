const server = require('./server');
server.default.listen(3000);

console.log('process.env.KOA', process.env.DEV);
if(!process.env.DEV) {
  require('./electron/main');
}
