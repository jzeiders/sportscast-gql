"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Team_1 = require("./Team");
const Quarter_1 = require("./Quarter");
const DFS_1 = require("./DFS");
let Game = class Game extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "week", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "date", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "time", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Team_1.Team),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "awayTeamId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Team_1.Team, "awayTeamId"),
    __metadata("design:type", Team_1.Team)
], Game.prototype, "awayTeam", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Team_1.Team),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Game.prototype, "homeTeamId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Team_1.Team, "homeTeadId"),
    __metadata("design:type", Team_1.Team)
], Game.prototype, "homeTeam", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Quarter_1.Quarter),
    __metadata("design:type", Array)
], Game.prototype, "Qaurters", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => DFS_1.DFS),
    __metadata("design:type", Array)
], Game.prototype, "DFSs", void 0);
Game = __decorate([
    sequelize_typescript_1.Table
], Game);
exports.Game = Game;
