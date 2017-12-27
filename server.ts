import * as express from "express";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import graphQLSchema from "./src/schema";
import { execute, subscribe } from "graphql";
import { Team } from "./src/models/Team";
import { Game } from "./src/models/Game";
import { pubsub } from "./src/schema/subscription";
import db from "./src/db";
import { createServer } from "http";
import * as cors from "cors";
import { SubscriptionServer } from "subscriptions-transport-ws";

const PORT = 4000;

const app = express();
app.use(cors());
app.use(
	"/graphql",
	bodyParser.json(),
	graphqlExpress({
		schema: graphQLSchema,
		tracing: true,
		cacheControl: true
	})
);
app.get(
	"/graphiql",
	graphiqlExpress({
		endpointURL: "/graphql",
		subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
	})
); // if you want GraphiQL enabled

const ws = createServer(app);

db.connection
	.sync({ force: true })
	.then(() => {
		ws.listen(PORT, () => {
			new SubscriptionServer(
				{
					execute,
					subscribe,
					schema: graphQLSchema
				},
				{
					server: ws,
					path: "/subscriptions"
				}
			);
		});
		sampleData();
		updateScores();
	})
	.catch(err => {
		console.log("Failed to Start");
		console.log(err);
	});

function sampleData() {
	Team.create({ teamID: "0", name: "Heat" });
	Team.create({ teamID: "1", name: "Celtics" });
	Game.create({ location: "Boston", homeTeamId: 1, awayTeamId: 0 });
}
async function updateScores() {
	setInterval(() => {
		pubsub.publish("GAME_SCORE", {
			gameScoreUpdate: {
				gameId: "1",
				homeScore: Math.floor(Math.random() * 10),
				awayScore: 10
			}
		});
	}, 1000);
}
