import { DBClient } from "./postgres/postgresDatabase";

export interface Database {
  getClient(): DBClient;
}
