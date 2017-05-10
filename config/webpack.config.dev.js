var apiPath = 'http://localhost:3001';
console.log(__dirname);
module.exports = require('./webpack.config.common.js')(apiPath);