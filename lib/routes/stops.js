// eslint-disable-next-line new-cap
const router = require('express').Router();
const Stop = require('../models/stop');
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addForecast = require('../middleware/add-forecast');

router
  .post('/:id', addGeo(), addForecast(), (req, res, next) => {
    console.log(req.body);
    Stop.create(req.body)
      .then(stop => {
        res.json(stop);
        Tour.findByIdAndUpdate(req.params.id, { $push: { stops: stop._id } }, { new: true })
          .then(updatedTour => updatedTour);
      })
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Stop.findByIdAndRemove(req.body)
      .then(stop => {
        res.json(stop);
        return Tour.where('stops', stop._id)
          .then(tour => {
            return Tour.findById(tour[0]._id, { $pull: { stops: req.body.id } }, { new: true })
              .then(updatedTour => updatedTour);
          });
      })
      .catch(next);
  })


  .put('/:id', (req, res, next) => {
    Stop.findByIdAndUpdate(req.body.id, { $set: { attendance: req.body.attendance } }, { new: true })
      .then(stop => res.json(stop))
      .catch(next);
  });

module.exports = router;