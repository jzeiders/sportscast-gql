import { Team } from "../models/Team";
import { User } from "../models/User";

type SetUserTeamsInput = {
	input: {
		teams: Team[];
		userId: number;
	};
};

export const resolvers = {
	Mutation: {
		setUserTeams: async (root, args: SetUserTeamsInput) => {
			let user = await User.findById(args.input.userId);
			let teams = await Promise.all(
				args.input.teams.map(team => Team.findById(team.teamID))
			);
			await Promise.all(
				args.input.teams.map(team => {
					user.$add("teams", team);
					team.$add("users", user);
				})
			);
			return user;
		}
	}
};
