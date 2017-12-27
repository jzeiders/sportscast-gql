import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();

export const GAME_SCORE = "GAME_SCORE";

export const resolvers = {
	Subscription: {
		gameScoreUpdate: {
			subscribe: () => pubsub.asyncIterator(GAME_SCORE)
		}
	}
};
