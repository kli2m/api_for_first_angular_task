const logger = require('./winston');
const { PORT } = require('../common/config');
const { finished } = require('stream');

module.exports = (req, res, next) => {
  const { method, protocol, hostname, originalUrl, query, params, body } = req;
  const date = Date().substr(0, 24);

  finished(res, () => {
    const { statusCode } = res;
    const strModelView = `${date} ${method} ${protocol}://${hostname}:${PORT}${originalUrl} ${JSON.stringify(
      query
    )} ${JSON.stringify(params)} ${JSON.stringify(body)} ${statusCode}`;

    if (statusCode > 399) {
      logger.error(strModelView);
      return;
    }
    logger.info(strModelView);
    return;
  });
  next();
};
