"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./src/schema");
const graphql_1 = require("graphql");
const Team_1 = require("./src/models/Team");
const Game_1 = require("./src/models/Game");
const subscription_1 = require("./src/schema/subscription");
const db_1 = require("./src/db");
const http_1 = require("http");
const cors = require("cors");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const PORT = 8080;
const app = express();
app.use(cors());
app.use("/graphql", bodyParser.json(), apollo_server_express_1.graphqlExpress({
    schema: schema_1.default,
    tracing: true,
    cacheControl: true
}));
app.get("/graphiql", apollo_server_express_1.graphiqlExpress({
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
})); // if you want GraphiQL enabled
const ws = http_1.createServer(app);
db_1.default.connection
    .sync({ force: true })
    .then(() => {
    ws.listen(PORT, () => {
        new subscriptions_transport_ws_1.SubscriptionServer({
            execute: graphql_1.execute,
            subscribe: graphql_1.subscribe,
            schema: schema_1.default
        }, {
            server: ws,
            path: "/subscriptions"
        });
    });
    sampleData();
    updateScores();
})
    .catch(err => {
    console.log("Failed to Start");
    console.log(err);
});
function sampleData() {
    Team_1.Team.create({ teamID: "0", name: "Heat" });
    Team_1.Team.create({ teamID: "1", name: "Celtics" });
    Game_1.Game.create({ location: "Boston", homeTeamId: 1, awayTeamId: 0 });
}
function updateScores() {
    return __awaiter(this, void 0, void 0, function* () {
        setInterval(() => {
            subscription_1.pubsub.publish("GAME_SCORE", {
                gameScoreUpdate: {
                    gameId: "1",
                    homeScore: Math.floor(Math.random() * 10),
                    awayScore: 10
                }
            });
        }, 1000);
    });
}
