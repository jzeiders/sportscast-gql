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
const Game_1 = require("./Game");
const Player_1 = require("./Player");
let Team = class Team extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        primaryKey: true
    }),
    __metadata("design:type", String)
], Team.prototype, "teamID", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "city", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Team.prototype, "abbreviation", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Game_1.Game),
    __metadata("design:type", Array)
], Team.prototype, "games", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Player_1.Player),
    __metadata("design:type", Array)
], Team.prototype, "players", void 0);
Team = __decorate([
    sequelize_typescript_1.Table
], Team);
exports.Team = Team;
