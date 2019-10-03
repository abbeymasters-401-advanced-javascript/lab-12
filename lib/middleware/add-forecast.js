// const getLocation = require('../services/maps-api');
const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {
  const { location } = req.body;

  if(!location) {
    return next({
      statusCode: 400,
      error: 'We need the address to complete'
    });
  }

  getForecast(location.latitude, location.longitude)
    .then(forecast => {
      req.body.weather = forecast;
      next();
    })
    .catch(next);
};