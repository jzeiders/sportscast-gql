"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
exports.resolvers = {
    Mutation: {
        setUserTeams: (root, args) => __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.User.findById(args.input.userId);
            let teams = yield Promise.all(args.input.teams.map(team => Team_1.Team.findById(team.teamID)));
            yield Promise.all(args.input.teams.map(team => {
                user.$add("teams", team);
                team.$add("users", user);
            }));
            return user;
        })
    }
};
