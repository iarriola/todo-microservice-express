
import { Client, QueryResult, QueryResultRow } from 'pg';
import { logger } from './logger';
import Database from './util/database';
import {Initializer, ReadRepository, WriteRepository, Task, TaskDao} from './model';
import TextUtil from './util/text'
import { response } from 'express';

export class Repository implements Initializer, ReadRepository<Task>, WriteRepository<Task> {

  private db: Database;

  private client: Client;

  constructor() {
    this.db = new Database();
    this.client = this.db.getClient();
  }

  async findOne(id: string): Promise<Task[]> {

    let query = `select ${TaskDao.Fields} from todo.task where ${TaskDao.Id} = '${id}' and ${TaskDao.DeletedAt} is null`;
    
    logger.debug({
      message: `SQL: ${TextUtil.cleanQuery(query)}`,
    });
    
    const result = await this.client.query(query);

    return result.rows.map(row => {
      return TaskDao.map(row)
    });


  }

  async findAll(): Promise<Task[]> {

    let query = `select ${TaskDao.Fields} from todo.task where ${TaskDao.DeletedAt} is null`;

    logger.debug({
      message: `SQL: ${TextUtil.cleanQuery(query)}`,
    });

    const result = await this.client.query(query);

    return result.rows.map(row => {
      return TaskDao.map(row)
    });

  }

  async create(item: Task): Promise<Task[]> {

    let query = TextUtil.cleanQuery(`
    insert into todo.task (${TaskDao.Title}, ${TaskDao.Description}) 
    values('${item.title}', '${item.description}') 
    returning ${TaskDao.Fields}`);

    logger.debug({
      message: query,
    });

    const result = await this.client.query(query);

    return result.rows.map(row => {
      return TaskDao.map(row)
    });

  }

  update(id: string, item: Task): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<boolean> {
    let query = `update todo.task set ${TaskDao.DeletedAt} = now() where ${TaskDao.Id} = '${id}'`;

    logger.debug({
      message: `SQL: ${TextUtil.cleanQuery(query)}`,
    });

    const result = await this.client.query(query);

    return (result.rowCount != 0);
  }

  async init() {
    await this.db.init();
  }

  

}

const todoRepository = new Repository();
export default todoRepository;
