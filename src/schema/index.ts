import { makeExecutableSchema } from "graphql-tools";
import { Model } from "sequelize-typescript";
import { Team } from "../models/Team";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { Op } from "sequelize";
import { Quarter } from "../models/Quarter";
import { resolvers as SubscriptionResolvers } from "./subscription";

const typeDefs: String = `
    type Query {
        hello: String
        Team: Team
        Teams: [Team]
        Game : Game
        Games : [Game]
        Player: Player
        Players: [Player]
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
`;

const resolvers = {
	Query: {
		hello(root, args, context) {
			return "Hello world!";
		},
		Team(root, { teamID }, context) {
			return Team.findById<Team>(teamID, { raw: true }).then(team => {
				return team;
			});
		},
		Teams(root, args, context) {
			return Team.findAll({ raw: true }).then(teams => {
				console.log(teams);
				return teams;
			});
		},
		Game(root, { id }, context) {
			return Game.findById<Game>(id, { raw: true });
		},
		Games(root, args, context) {
			return Game.findAll({ raw: true });
		},
		Player(root, { id }, context) {
			return Player.findById(id, { raw: true });
		},
		Players(root, args, context) {
			return Player.findAll({ raw: true });
		}
	},
	Game: {
		HomeTeam(game: Game) {
			return Team.findById(game.homeTeamId);
		},
		AwayTeam(game: Game) {
			return Team.findById(game.awayTeamId);
		},
		Quarters(game: Game) {
			return Quarter.findAll({ where: { gameId: game.id } });
		}
	},
	Team: {
		Games(team: Team) {
			return Game.findAll({
				where: {
					[Op.or]: [{ homeTeamId: team.teamID }, { awayTeamId: team.teamID }]
				}
			});
		}
	},
	Player: {
		Team(player: Player) {
			return Team.findAll({
				where: {
					teamID: player.teamID
				}
			});
		}
	},
	...SubscriptionResolvers
};

const jsSchema = makeExecutableSchema({
	typeDefs,
	resolvers
});

export default jsSchema;
