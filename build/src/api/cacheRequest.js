"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const redisGet = params => { };
const cacheRequest = params => {
    request(params, (err, res, body) => {
        if (res.statusCode != 304) {
        }
    });
};
exports.request = cacheRequest;
