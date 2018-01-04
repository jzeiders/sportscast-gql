import {
	Table,
	Model,
	Column,
	HasMany,
	BelongsToMany
} from "sequelize-typescript";
import { Game } from "./Game";
import { Player } from "./Player";
import { User } from "./User";
import { UserTeam } from "./UserTeam";
import { DFS } from "./DFS";
@Table
class Team extends Model<Team> {
	@Column({
		primaryKey: true
	})
	teamID: string;

	@Column city: string;

	@Column name: string;

	@Column abbreviation: string;

	@HasMany(() => Game)
	games: Game[];

	@HasMany(() => Player)
	players: Player[];

	@HasMany(() => DFS)
	DFSs: DFS[];

	@BelongsToMany(() => User, () => UserTeam)
	teams: Team[];
}

export { Team };
