const request = require('supertest');
const express = require('express');
const { assert } = require('chai');
const kongJwt = require('../lib');

const app = express();
app.use(kongJwt);

app.get('/test', function (req, res) {
  res.send(req.kong);
});

const XConsumerID = 'X-Consumer-ID';
const XConsumerCustomID = 'X-Consumer-Custom-ID';
const XConsumerUsername = 'X-Consumer-Username';
const XAnonymousConsumer = 'X-Anonymous-Consumer'

describe('Kong JWT Middleware', () => {
  it('should set headers', async () => {
    const result = await request(app)
      .get('/test')
      .set({
        [XConsumerID]: 'my_consumer_id',
        [XConsumerCustomID]: 'my_consumer_custom_id',
        [XConsumerUsername]: 'my_consumer_username',
        [XAnonymousConsumer]: 'my_anonymous_consumer',
      });

    const body = result.body;
    assert.deepEqual(body, {
      consumerID: 'my_consumer_id',
      consumerCustomID: 'my_consumer_custom_id',
      consumerUsername: 'my_consumer_username',
      anonymousConsumer: 'my_anonymous_consumer'
    })
  });
});
