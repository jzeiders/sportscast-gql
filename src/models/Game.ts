import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  Scopes,
  HasMany
} from "sequelize-typescript";

import { Team } from "./Team";
import { Quarter } from "./Quarter";
import { DFS } from "./DFS";
@Table
export class Game extends Model<Game> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  id: number;
  @Column week: string;
  @Column date: string;
  @Column time: string;
  @Column location: string;

  @ForeignKey(() => Team)
  @Column
  awayTeamId: string;

  @BelongsTo(() => Team, "awayTeamId")
  awayTeam: Team;

  @ForeignKey(() => Team)
  @Column
  homeTeamId: string;

  @BelongsTo(() => Team, "homeTeamId")
  homeTeam: Team;

  @HasMany(() => Quarter)
  Qaurters: Quarter[];

  @HasMany(() => DFS)
  DFSs: DFS[];
}
