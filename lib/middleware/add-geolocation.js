const getLocation = require('../services/maps-api');
const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { address } = req.body;

  if(!address) {
    return next({
      statusCode: 400,
      error: 'We need the address to complete'
    });
  }

  getLocation(address)
    .then(location => {
      if(!location) {
        throw {
          statusCode: 400,
          error: 'Address must be resolved to geolocation'
        };
      }

      req.body.location = location;
      next();
    })
    .catch(next);
};