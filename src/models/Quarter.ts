import {
	Table,
	Model,
	Column,
	BelongsTo,
	ForeignKey
} from "sequelize-typescript";
import { Game } from "./Game";

@Table
export class Quarter extends Model<Quarter> {
	@Column({
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	number: string;
	awayScore: number;
	homeScore: number;
	@ForeignKey(() => Game)
	@Column
	gameId: number;

	@BelongsTo(() => Game)
	game: Game;
}
