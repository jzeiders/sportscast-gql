/// <reference path="./index.d.ts"/>

import { Model, Sequelize } from "sequelize-typescript";
import config from "../config";

let dbConfig = config.db;

const connection = new Sequelize({
	database: dbConfig.db,
	dialect: "postgres",
	host: dbConfig.host,
	username: dbConfig.username,
	password: dbConfig.password,
	modelPaths: [__dirname + "/models"]
});
let Models = connection.model;
let db: Types.DB = {
	Sequelize,
	connection
};

export default db;
