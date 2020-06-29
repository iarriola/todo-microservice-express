
import { Client, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';
import Database from './util/database';
import {Initializer, ReadRepository, WriteRepository, Task, TaskDao} from './model';
import { response } from 'express';

export class Repository implements Initializer, ReadRepository<Task>, WriteRepository<Task> {

  private db: Database;

  private client: Client;

  constructor() {
    this.db = new Database();
    this.client = this.db.getClient();
  }

  findOne(id: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Task[]> {
    const result = await this.client.query(`select ${TaskDao.Fields} from todo.task`);

    return result.rows.map(row => {
      return TaskDao.map(row)
    });

  }

  create(item: Task): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  update(id: string, item: Task): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.client
    .query(`update todo.task set ${TaskDao.DeletedAt} = now() where ${TaskDao.Id} = '${id}'`);

    return (result.rowCount != 0);
  }

  async init() {
    await this.db.init();
  }

  

}

const todoRepository = new Repository();
export default todoRepository;
