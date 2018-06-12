// Kong upstream headers found here: https://getkong.org/plugins/jwt/#upstream-headers

const XConsumerID = 'X-Consumer-ID'; // the ID of the Consumer on Kong
const XConsumerCustomID = 'X-Consumer-Custom-ID'; // the custom_id of the Consumer (if set)
const XConsumerUsername = 'X-Consumer-Username'; // the username of the Consumer (if set)
const XAnonymousConsumer = 'X-Anonymous-Consumer'; // will be set to true when authentication failed, and the 'anonymous' consumer was set instead.

module.exports = (req, res, next) => {
  const consumerID = req.header(XConsumerID);
  const consumerCustomID = req.header(XConsumerCustomID);
  const consumerUsername = req.header(XConsumerUsername);
  const anonymousConsumer = req.header(XAnonymousConsumer);

  const kong = {};
  if (consumerID) kong.consumerID = consumerID;
  if (consumerCustomID) kong.consumerCustomID = consumerCustomID;
  if (consumerUsername) kong.consumerUsername = consumerUsername;
  if (anonymousConsumer) kong.anonymousConsumer = anonymousConsumer;

  req.kong = kong;
  next();
};
