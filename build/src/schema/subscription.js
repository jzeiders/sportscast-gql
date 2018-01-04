"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.GAME_SCORE = "GAME_SCORE";
exports.resolvers = {
    Subscription: {
        gameScoreUpdate: {
            subscribe: () => exports.pubsub.asyncIterator(exports.GAME_SCORE)
        }
    }
};
