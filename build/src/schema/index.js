"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const Team_1 = require("../models/Team");
const Game_1 = require("../models/Game");
const Player_1 = require("../models/Player");
const User_1 = require("../models/User");
const sequelize_1 = require("sequelize");
const Quarter_1 = require("../models/Quarter");
const subscription_1 = require("./subscription");
const mutation_1 = require("./mutation");
const typeDefs = `
    type Query {
        hello: String
        Team: Team
        Teams: [Team]
        Game : Game
        Games : [Game]
        Player: Player
		Players: [Player]
		viewer: User
	}
	input SetUserTeamsInput {
		teams: [String]
		userId: String
	}

	type Mutation {
		setUserTeams(input: SetUserTeamsInput) : User
	}
    type Subscription {
        gameScoreUpdate: GameScore
    }
    type GameScore {
        gameId: String
        homeScore: Int
        awayScore: Int
    }

    type Team {
        teamID  : String
        city : String
        name : String
		abbreviation : String
		division: String
        Games : [Game]
    }
    type Game {
        id : String
        week : String
        date : String
        time : String
        location : String
        AwayTeam : Team
        HomeTeam : Team
        Quarters : [Quarter]
    }

    type Player {
        id: String
        lastName: String
        firstName: String
        jerseyNumber: String
        position: String
        height: String
        weight: String
        birthDate: String
        age: String
        birthCity: String
        birthCountry: String
        isRookie: Boolean
        Team: Team
    }
    type Quarter {
        id: String
        number: String
        awayScore: Int
        homeScore: Int
	}
	type DFS {
		fantasyPoints: Int
		salary: Int
	}
	type User {
		name: String
		id: Int
		email: String
		teams: [Team]
	}
`;
const resolvers = Object.assign({ Query: {
        hello(root, args, context) {
            return "Hello world!";
        },
        Team(root, { teamID }, context) {
            return Team_1.Team.findById(teamID, { raw: true }).then(team => {
                return team;
            });
        },
        Teams(root, args, context) {
            return Team_1.Team.findAll({ raw: true }).then(teams => {
                console.log(teams);
                return teams;
            });
        },
        Game(root, { id }, context) {
            return Game_1.Game.findById(id, { raw: true });
        },
        Games(root, args, context) {
            return Game_1.Game.findAll({ raw: true });
        },
        Player(root, { id }, context) {
            return Player_1.Player.findById(id, { raw: true });
        },
        Players(root, args, context) {
            return Player_1.Player.findAll({ raw: true });
        },
        viewer(root, args, context) {
            return User_1.User.findById(context.id);
        }
    }, Game: {
        HomeTeam(game) {
            return Team_1.Team.findById(game.homeTeamId);
        },
        AwayTeam(game) {
            return Team_1.Team.findById(game.awayTeamId);
        },
        Quarters(game) {
            return Quarter_1.Quarter.findAll({ where: { gameId: game.id } });
        }
    }, Team: {
        Games(team) {
            return Game_1.Game.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ homeTeamId: team.teamID }, { awayTeamId: team.teamID }]
                }
            });
        }
    }, Player: {
        Team(player) {
            return Team_1.Team.findAll({
                where: {
                    teamID: player.teamID
                }
            });
        }
    } }, mutation_1.resolvers, subscription_1.resolvers);
//Graphql Types don't support subscriptions in typings
//This should be fixed at somepoint
const jsSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
exports.default = jsSchema;
