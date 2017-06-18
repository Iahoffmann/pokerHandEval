const shortToLongRankings = {
  A: 'Ace',
  K: 'King',
  Q: 'Queen',
  J: 'Jack',
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2,
};

const cardRankEnum = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2
};

const shortToLongSuit = {
  h: 'Hearts',
  s: 'Spades',
  d: 'Diamonds',
  c: 'Clubs'
};

const handRakings = {
  highCard: 'High Card',
  pair: 'Pair',
  twoPair: 'Two Pair'
  triple: 'Three of a Kind',
  straight: 'Straight',
  flush: 'Flush',
  fullHouse: 'Full House',
  quad: 'Four of a Kind',
  straightFlush: 'Straight Flush',
  royalFlush: 'Royal Flush'
};

module.exports.shortToLongRankings = shortToLongRankings;
module.exports.cardRankEnum = cardRankEnum;
module.exports.shortToLongSuit = shortToLongSuit;
module.exports.handRakings = handRakings;
