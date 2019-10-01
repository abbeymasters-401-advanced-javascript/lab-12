const request = require('../request');
const db = require('../db');
// eslint-disable-next-line no-unused-vars
const matchMongoId = require('../match-helpers');

describe('tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tourData = {
    title: 'akm tours',
    activities: ['beer tastings', 'llama petting zoos', 'relays']
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a tour', () => {
    return postTour(tourData).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        {
          _id: expect.any(String),
          __v: 0,
          stops: expect.any(Array),
          launchDate: expect.any(String)
        },
        `
        Object {
          "__v": 0,
          "_id": Any<String>,
          "activities": Array [
            "beer tastings",
            "llama petting zoos",
            "relays",
          ],
          "launchDate": Any<String>,
          "stops": Any<Array>,
          "title": "akm tours",
        }
      `
      );
    });
  });

  it('gets all tours', () => {
    return Promise.all([
      postTour(tourData),
      postTour(tourData),
      postTour(tourData)
    ])
      .then(() => {
        return request.get('/api/tours').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toMatchInlineSnapshot(
          {},
          `
          Object {
            "__v": 0,
            "_id": "5d93caf4acd3dc4da2326394",
            "activities": Array [
              "beer tastings",
              "llama petting zoos",
              "relays",
            ],
            "launchDate": "2019-10-01T21:53:56.087Z",
            "stops": Array [],
            "title": "akm tours",
          }
        `
        );
      });
  });
});
