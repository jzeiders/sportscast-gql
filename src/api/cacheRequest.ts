import * as request from "request";
import * as redis from "redis";
import { RequestResponse } from "request";

const redisGet = params => {};

const cacheRequest = params => {
	request(params, (err, res: RequestResponse, body) => {
		if (res.statusCode != 304) {
		}
	});
};

export { cacheRequest as request };
