import {
	Table,
	Model,
	Column,
	ForeignKey,
	BelongsTo
} from "sequelize-typescript";

import { Player } from "./Player";
import { Game } from "./Game";
import { Team } from "./Team";

@Table
export class DFS extends Model<DFS> {
	@Column({
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	@Column company: string;
	@Column fantasyPoints: number;
	@Column salary: number;

	@ForeignKey(() => Team)
	@Column
	teamId: string;

	@BelongsTo(() => Team)
	team: Team;

	@ForeignKey(() => Game)
	@Column
	gameId: number;

	@BelongsTo(() => Game)
	game: Game;

	@ForeignKey(() => Player)
	@Column
	playerId: number;

	@BelongsTo(() => Player)
	player: Player;
}
