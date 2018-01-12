"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("./models/Team");
const Game_1 = require("./models/Game");
const lp = require("lorem-ipsum");
const words = (count) => lp({ count, units: "words" });
const division = () => (Math.random() < 0.5 ? "West" : "East");
const createTeam = (teamID) => {
    return Team_1.Team.create({
        teamID,
        city: words(1),
        name: words(1),
        abbreviation: words(1),
        division: division(),
        color: "#f00",
        logo: "http://lorempixel.com/50/50"
    });
};
const createGame = (homeTeamId, awayTeamId) => {
    return Game_1.Game.create({
        homeTeamId,
        awayTeamId,
        week: words(1),
        date: words(1),
        time: words(1),
        location: words(2)
    });
};
const createData = () => {
    for (let i = 0; i < 20; i++) {
        createTeam(String(i));
    }
    for (let i = 0; i < 20; i++) {
        let Team2 = Math.floor(Math.random() * 20);
        createGame(String(i), String(Team2));
    }
};
exports.default = createData;
