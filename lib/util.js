const Card = require('./cardClass');
const _ = require('lodash');
const cardRankings = require('./cardRanking');

const parseHand = function(unparsedHand){
  let cards = _.split(unparsedHand, ' ', 5);
  return _.map(cards, (card) => {
    const rank = cardRankings.cardRankEnum[card.charAt(0)];
    return new Card(rank, card.charAt(1));
  });
};

const checkFlush = function(hand) {
  const suitToCheck = _.first(hand).suit;
  return _.every(hand, (card) => {
    return card.suit === suitToCheck;
  });
};

const checkStraight = function(sortedHand) {
  return _.every(sortedHand, (card, index, sortedHand) => {
    if (index + 1 < sortedHand.length) {
      return card.rank + 1 === sortedHand[index + 1].rank;
    }
    return true;
  });
};

const findMelds = function(sortedHand) {

};

const evaluateHand = function(unparsedHand) {
  let hand = parseHand(unparsedHand);
  hand = _.sortBy(hand, ['rank']);
  const flush = checkFlush(hand);
  const straight = checkStraight(hand);
  const handRakings = cardRankings.handRakings;
  if(flush && straight) {
    return _.last(hand).rank === cardRankings.cardRankEnum.A ? handRakings.royalFlush : handRakings.straightFlush;
  } else if (straight) {
    return handRakings.straight;
  } else if (flush) {
    return handRakings.flush
  } else {
    const melds = findMelds(hand);
  }
};

module.exports.evaluateHand = evaluateHand;
