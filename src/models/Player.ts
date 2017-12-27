import {
	Table,
	Model,
	Column,
	ForeignKey,
	BelongsTo
} from "sequelize-typescript";

import { Team } from "./Team";

@Table
export class Player extends Model<Player> {
	@Column({
		primaryKey: true,
		autoIncrement: true
	})
	id: number;
	@Column lastName: string;
	@Column firstName: string;
	@Column jerseyNumber: string;
	@Column position: string;
	@Column height: string;
	@Column weight: string;
	@Column birthDate: string;
	@Column age: string;
	@Column birthCity: string;
	@Column birthCountry: string;
	@Column isRookie: boolean;

	@ForeignKey(() => Team)
	@Column
	teamID: string;

	@BelongsTo(() => Team)
	team: Team;
}
