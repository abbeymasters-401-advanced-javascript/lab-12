const request = require('../request');
const db = require('../db');

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

  it('adds a stop to this tour', () => {
    return postTour(tourData)
      .then((tour => {
        return request
          .post(`/api/stops/${tour._id}`)
          .send(newStop)
          .expect(200)
          .then(({ body }) => {
            console.log(body);
          });
      })
      );
  });
});
