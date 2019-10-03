const request = require('../request');
const db = require('../db');

jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

getForecast.mockResolvedValue([
  {
    time: '2019-10-02T07:00:00.000Z',
    forecast: 'Possible drizzle overnight.',
    high: 63.29,
    low: 47.07
  },
  {
    time: '2019-10-03T07:00:00.000Z',
    forecast: 'Cloudy with snow at high elevations.',
    high: 50.89,
    low: 38.13
  }
]);

getLocation.mockResolvedValue([
  {
    latitude: 43,
    longitude: -122
  }
]);

describe('stops testing', () => {
  beforeEach(() => {
    return Promise.all([
      db.dropCollection('stops'),
      db.dropCollection('tours')
    ]);
  });

  const tourData = {
    title: 'akm tours',
    activities: ['beer tastings', 'llama petting zoos', 'relays']
  };

  const newStop = {
    address: '4912 Chestnut'
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a stop to this tour', () => {
    return postTour(tourData).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(newStop)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              __v: 0,
              _id: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
            }
          `
          );
        });
    });
  });


  it('deletes a stop', () => {
    return postTour(tourData)
      .then(tour => {
        return request
          .post(`/api/stops/${tour._id}`)
          .send(newStop)
          .expect(200)
          .then(({ body }) => {
            const stopId = body._id;
            return request
              .delete(`/api/stops/${tour._id}`)
              .send({ id: stopId })
              .expect(200)
              .then(() => {
                return request
                  .get('/api/tours')
                  .then(({ body }) => {
                    expect(body[0].stops).toEqual([]);
                  });
              });
          });
      });
  });

  it('updates a stop', () => {
    return postTour(tourData).then(tour => {
      return request
        .post(`/api/stops/${tour._id}`)
        .send(newStop)
        .expect(200)
        .then(({ body }) => {
          const stopId = body._id;
          return request
            .put(`/api/stops/${tour._id}`)
            .send({ id: stopId, attendance: 4 })
            .expect(200)
            .then(({ body }) => {
              expect(body.attendance).toBe(4);
            });
        });
    });
  });


});
