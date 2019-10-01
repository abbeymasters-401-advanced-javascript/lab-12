const request = require('../request');
const db = require('../db');
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
      .post('/api/tour')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a book', () => {
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
});
