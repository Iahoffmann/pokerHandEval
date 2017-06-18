require('./cardClass');
require('lodash');

const parseHand = function(unparsedHand){
  let cards = _.split(unparsedHand, ' ', 5);
  return _.map(cards, (card) => {
    return new Card()
  });
};

const evaluateHand = function(hand) {
  return 'test';
};

module.exports.evaluateHand = evaluateHand;
