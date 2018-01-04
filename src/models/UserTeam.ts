import { Table, Model, Column, ForeignKey } from "sequelize-typescript";

import { User } from "./User";
import { Team } from "./Team";

@Table
class UserTeam extends Model<UserTeam> {
	@ForeignKey(() => User)
	@Column
	userId: number;

	@ForeignKey(() => Team)
	@Column
	teamId: number;
}

export { UserTeam };
