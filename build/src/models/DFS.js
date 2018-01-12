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
const Player_1 = require("./Player");
const Game_1 = require("./Game");
const Team_1 = require("./Team");
let DFS = class DFS extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], DFS.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DFS.prototype, "company", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DFS.prototype, "fantasyPoints", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DFS.prototype, "salary", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Team_1.Team),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], DFS.prototype, "teamId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Team_1.Team),
    __metadata("design:type", Team_1.Team)
], DFS.prototype, "team", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Game_1.Game),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DFS.prototype, "gameId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Game_1.Game),
    __metadata("design:type", Game_1.Game)
], DFS.prototype, "game", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Player_1.Player),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], DFS.prototype, "playerId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Player_1.Player),
    __metadata("design:type", Player_1.Player)
], DFS.prototype, "player", void 0);
DFS = __decorate([
    sequelize_typescript_1.Table
], DFS);
exports.DFS = DFS;
