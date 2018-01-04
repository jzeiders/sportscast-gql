import { Table, Model, Column, BelongsToMany } from "sequelize-typescript";

import { Team } from "./Team";
import { UserTeam } from "./UserTeam";

@Table
class User extends Model<User> {
	@Column({
		primaryKey: true,
		autoIncrement: true
	})
	id: number;

	@BelongsToMany(() => Team, () => UserTeam)
	teams: Team[];
}

export { User };
