import { makeExecutableSchema } from "graphql-tools";
import { Model } from "sequelize-typescript";
import { Team } from "../models/Team";
import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { User } from "../models/User";
import { Op } from "sequelize";
import { Quarter } from "../models/Quarter";
import { resolvers as SubscriptionResolvers } from "./subscription";
import { resolvers as MutationResolvers } from "./mutation";

const typeDefs: String = `
  type Query {
    hello: String
    Team: Team
    Teams: [Team]
    Game(id: String) : Game
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
		createUpdateUser : User
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
    color: String
    logo: String
    Record: Record
    Games : [Game]
  }
  type Record {
    wins: Int
    losses: Int
  }
  type Game {
    id : String
    week : String
    date : String
    time : String
    homeScore: Int
    awayScore: Int
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
		Teams: [Team]
	}
`;

const resolvers = {
  Query: {
    hello(root, args, context) {
      return JSON.stringify(context.user.email);
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
    },
    viewer(root, args, context) {
      return User.findById(context.id);
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
    },
    Record(team: Team) {
      return {
        wins: team.wins,
        losses: team.losses
      };
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
  User: {
    Teams(user: User) {
      return User.findById(user.id, { include: [Team] }).then(user => {
        return user.teams.map(team => team.get({ plain: true }));
      });
    }
  },
  ...MutationResolvers,
  ...SubscriptionResolvers
};

//Graphql Types don't support subscriptions in typings
//This should be fixed at somepoint
const jsSchema = makeExecutableSchema({
  typeDefs: typeDefs as any,
  resolvers: resolvers as any
});

export default jsSchema;
