const Card = require('./cardClass');
const _ = require('lodash');
const cardRankings = require('./cardRanking');
const text = require('./textConstants');

const parseHand = function(unparsedHand){
    let cards = _.split(unparsedHand, ' ', 5);
    if(cards.length < 5) {
        return text.errorMessages.notEnoughCards;
    }

    let hasInvalidInput = false;
    const hand = _.map(cards, (card) => {
        const suit = cardRankings.shortToLongSuit[card.charAt(card.length - 1)];
        const rank = cardRankings.cardRankEnum[_.trimEnd(card, 'hdcs')];
        if(!rank || !suit){
            hasInvalidInput = true;
        }
        return new Card(rank, suit);
    });

    const uniqHand = _.uniqBy(hand, (card) => {
        return card.rank + card.suit;
    });

    if(hasInvalidInput) {
        return text.errorMessages.invalidInput;
    } else if (uniqHand.length < hand.length) {
        return text.errorMessages.duplicateCards;
    } else {
        return hand;
    }
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

const findMeldRankings = function(sortedHand) {
    const handRakings = cardRankings.handRakings;
    const melds = _.groupBy(sortedHand, (card) => {
        return card.rank;
    });
    const quad = _.find(melds, (cards) => cards.length === 4);
    if(quad){
        return handRakings.quad;
    }

    const triple = _.find(melds, (cards) => cards.length === 3);
    const pairs = _.filter(melds, (cards) => cards.length === 2);

    if(triple){
        return !_.isEmpty(pairs) ? handRakings.fullHouse: handRakings.triple;
    } else if (!_.isEmpty(pairs)) {
        let rankEnumInvert = _.invert(cardRankings.cardRankEnum)[pairs[0][0].rank];
        let rankLongForm = cardRankings.shortToLongRankings[rankEnumInvert];
        return pairs.length === 2 ? handRakings.twoPair : `${handRakings.pair} of ${rankLongForm}s`;
    } else {
        const highCard = _.last(sortedHand).rank;
        let rankEnumInvert = _.invert(cardRankings.cardRankEnum)[highCard];
        let rankLongForm = cardRankings.shortToLongRankings[rankEnumInvert];
        return `${handRakings.highCard} ${rankLongForm}`;
    }
};

const evaluateHand = function(unparsedHand) {
    let hand = parseHand(unparsedHand);

    if(_.isString(hand)){
        return hand;
    }

    hand = _.sortBy(hand, ['rank']);
    const flush = checkFlush(hand);
    const straight = checkStraight(hand);
    const handRakings = cardRankings.handRakings;
    const highCard = _.last(hand).rank;

    if(flush && straight) {
        return highCard === cardRankings.cardRankEnum.A ? handRakings.royalFlush : handRakings.straightFlush;
    } else if (straight) {
        return handRakings.straight;
    } else if (flush) {
        return handRakings.flush;
    } else {
        return findMeldRankings(hand);
    }
};

module.exports.evaluateHand = evaluateHand;
