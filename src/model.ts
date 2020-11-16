import { QueryResultRow } from "pg";

export interface Initializer {
  init(): void;
}

export interface WriteRepository<T> {
  create(item: T): Promise<T[]>;
  update(id: string, item: T): Promise<T[]>;
  delete(id: string): Promise<boolean>;
}

export interface ReadRepository<T> {
  findOne(id: string): Promise<T[]>;
  findAll(): Promise<T[]>;
}

export interface SearchRepository<T> {
  find(item: T): Promise<T[]>;
}

export class Task {
  public id: string;
  public title: string;
  public description: string;
  public createdAt: string;
  public completed: boolean;
  public deletedAt?: string;

  constructor(id: string, title: string, description: string, completed: boolean, createdAt: string, deletedAt?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

}

export class TaskDao {
  public static Id: string = 'uuid';
  public static Title: string = 'title'
  public static Description: string = 'description';
  public static CreatedAt: string = 'created_at';
  public static Completed: string = 'completed_at';
  public static DeletedAt: string = 'deleted_at';
  public static Fields: string =
  `
    ${TaskDao.Id}, 
    ${TaskDao.Title}, 
    ${TaskDao.Description}, 
    ${TaskDao.Completed}, 
    ${TaskDao.CreatedAt}, 
    ${TaskDao.DeletedAt}
  `;

  public static map(row: QueryResultRow): Task {
    return new Task(
      row[TaskDao.Id],
      row[TaskDao.Title],
      row[TaskDao.Description],
      (row[TaskDao.Completed] == null) ? false : true,
      new Date(row[TaskDao.CreatedAt]).toISOString(),
      (row[TaskDao.DeletedAt]) ? new Date(row[TaskDao.DeletedAt]).toISOString() : undefined
    );
  }

}
