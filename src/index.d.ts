import { Model } from "sequelize-typescript";

declare namespace Types {
  export interface DB {
    Sequelize: any;
    connection: any;
  }
}
export type Context = {
  user: {
    name: string;
    email: string;
    picture: string;
    iss: string;
    aud: string;
    sub: string;
    exp: string;
    iat: string;
  };
};
export as namespace Types;
