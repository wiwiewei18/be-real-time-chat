import { PostgresClient } from "./postgres/postgresDatabase";

export interface Database {
  getClient(): PostgresClient;
}
