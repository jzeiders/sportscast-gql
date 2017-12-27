import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { Game } from "./Game";
import { Player } from "./Player";
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
}

export { Team };
