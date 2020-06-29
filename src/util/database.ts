import dotenv from 'dotenv';
import { Initializer } from "../model";
import { Client } from "pg";
import { logger } from "../logger";

export default class Database implements Initializer {
    private dbClient: Client;
  
    constructor() {
      dotenv.config();
  
      const { db_todo_connection = 'postgres://postgres:postgres@localhost:5432/postgres' } = process.env;

      this.dbClient = new Client({
        connectionString: db_todo_connection,
        ssl: process.env.db_todo_connection ? true : false
      });
  
      this.dbClient.on('error', (err: Error) => {
        logger.error({
          message: `Postgres client: Unexpected error on idle client`,
          extra: err,
        });
      
        process.exit(1);
      });
  
    }

    public async init() {
      await this.dbClient.connect();
      logger.debug({
        message: `Postgres client status: connected`,
      });
    }
  
    public getClient(): Client {
      return this.dbClient;
    }

}
