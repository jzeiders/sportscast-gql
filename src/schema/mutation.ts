import { Team } from "../models/Team";
import { User } from "../models/User";
import { Context } from "../index";
type SetUserTeamsInput = {
  input: {
    teams: [string];
  };
};

export const resolvers = {
  Mutation: {
    setUserTeams: async (root, args: SetUserTeamsInput, context: Context) => {
      let user = await User.find({
        where: { auth0_user_id: context.user.sub }
      });
      let teams = await Promise.all(
        args.input.teams.map(team => Team.findById(team))
      );
      await Promise.all(
        teams.map(team => {
          user.$add("teams", team);
        })
      );
      return user.get({ plain: true });
    },
    createUpdateUser: async (root, args, context: Context) => {
      //Handles sign up / login, determined by auth0 user id
      let [user, created] = await User.findOrCreate({
        where: { auth0_user_id: context.user.sub }
      });

      return user;
    }
  }
};
