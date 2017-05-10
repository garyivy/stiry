var apiPath = '../api/';
// Note: webpack -p automatically gives us a pretty good optization.
// See: https://webpack.js.org/guides/production-build/#the-automatic-way
// Here was just need a nice way to declare a potentially different API path.
module.exports = require('./webpack.config.common.js')(apiPath);