"use strict";
/// <reference path="./index.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
let dbConfig = config_1.default.db;
const connection = new sequelize_typescript_1.Sequelize({
    database: dbConfig.db,
    dialect: "postgres",
    host: dbConfig.host,
    username: dbConfig.username,
    password: dbConfig.password,
    modelPaths: [__dirname + "/models"]
});
let Models = connection.model;
let db = {
    Sequelize: sequelize_typescript_1.Sequelize,
    connection
};
exports.default = db;
