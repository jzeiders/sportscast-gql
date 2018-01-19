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

  @Column division: string;

  @Column color: string;

  @Column logo: string;

  @Column wins: number;

  @Column losses: number;

  @HasMany(() => Game)
  games: Game[];

  @HasMany(() => Player)
  players: Player[];

  @HasMany(() => DFS)
  DFSs: DFS[];

  @BelongsToMany(() => User, () => UserTeam)
  users: Team[];
}

export { Team };
