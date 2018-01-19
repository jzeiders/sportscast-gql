import { RedisPubSub } from "graphql-redis-subscriptions";
import config from "../../config";

export const pubsub = new RedisPubSub({
  connection: {
    ...config.redis
  }
});

export const GAME_SCORE = "GAME_SCORE";

export const resolvers = {
  Subscription: {
    gameScoreUpdate: {
      subscribe: () => pubsub.asyncIterator(GAME_SCORE)
    } as any
  }
};
