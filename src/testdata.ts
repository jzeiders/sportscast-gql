import { Team } from "./models/Team";
import { Game } from "./models/Game";
import * as lp from "lorem-ipsum";

const words = (count: number) => lp({ count, units: "words" });
const division = () => (Math.random() < 0.5 ? "West" : "East");

const createTeam = (teamID: string) => {
	return Team.create({
		teamID,
		city: words(1),
		name: words(1),
		abbreviation: words(1),
		division: division(),
		color: "#f00",
		logo: "http://lorempixel.com/50/50"
	});
};

const createGame = (homeTeamId: string, awayTeamId: string) => {
	return Game.create({
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

export default createData;
