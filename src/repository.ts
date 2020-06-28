import dotenv from 'dotenv';
import { Client, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';
import {Initializer, ReadRepository, WriteRepository, Task} from './model';

export class Repository implements Initializer, ReadRepository<Task>, WriteRepository<Task> {

  private connection: Connection;

  private dbClient: Client;

  constructor() {
    this.connection = new Connection();
    this.dbClient = this.connection.getClient();
  }

  findOne(id: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  search(item: Task): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  create(item: Task): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  update(id: string, item: Task): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async init() {
    await this.connection.init();
  }

}

class Connection implements Initializer {
  private dbClient: Client;

  constructor() {
    dotenv.config();

    const { db_todo_connection = 'postgres://postgres:postgres@localhost:5432/postgres' } = process.env;

    this.dbClient = new Client({
      connectionString: db_todo_connection,
      ssl: process.env.db_todo_connection ? true : false
    });

    this.dbClient.on('error', (err: Error) => {
      logger.info({
        message: `Postgres client: Unexpected error on idle client`,
        extra: err,
      });
    
      process.exit(1);
    });

  }

  public async init() {
    await this.dbClient.connect();
    logger.info({
      message: `Postgres client connected`,
    });
  }

  public getClient(): Client {
    return this.dbClient;
  }

}


/*
const mapper = (row: QueryResultRow) => {
  return new Channel(
    row[ChannelDao.Id],
    row[ChannelDao.Name],
    row[ChannelDao.DisplayName],
    row[ChannelDao.Url],
    new Date(row[ChannelDao.CreatedAt]),
    new Date(row[ChannelDao.DeactivatedAt])
  );
}
*/


const todoRepository = new Repository();
export default todoRepository;
