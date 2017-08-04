// Note: webpack -p automatically gives us a pretty good optization.
// See: https://webpack.js.org/guides/production-build/#the-automatic-way
// So, we don't need to do a lot of configuration for production.
var isDevelopment = false;
module.exports = require('./webpack.config.common.js')(isDevelopment);