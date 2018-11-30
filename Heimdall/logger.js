const winston = require('winston');
const path = require('path');

// Configure custom app-wide logger
module.exports = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
	level:process.env.LOG_LEVEL
	}),
    new (winston.transports.File)({
      name: 'info-file',
      filename: path.resolve(__dirname, '../info.log'),
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: path.resolve(__dirname, '../error.log'),
      level: 'error'
    })
  ]
});
