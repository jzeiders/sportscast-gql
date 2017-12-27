import { Model } from "sequelize-typescript";

declare namespace Types {
	export interface DB {
		Sequelize: any;
		connection: any;
	}
}
export = Types;
export as namespace Types;
