import { QueryResultRow } from "pg";

export interface Initializer {
  init(): void;
}

export interface WriteRepository<T> {
  create(item: T): Promise<boolean>;
  update(id: string, item: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface ReadRepository<T> {
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}

export interface SearchRepository<T> {
  find(item: T): Promise<T[]>;
}

export class Task {
  private id: string;
  private title: string;
  private description: string;
  private createdAt: string;
  private deletedAt?: string;

  constructor(id: string, title: string, description: string, createdAt: string, deletedAt?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.deletedAt = deletedAt;
  }

}

export class TaskDao {
  public static Id: string = 'uuid';
  public static Title: string = 'title'
  public static Description: string = 'description';
  public static CreatedAt: string = 'created_at';
  public static DeletedAt: string = 'deleted_at';
  public static Fields: string =
  `
    ${TaskDao.Id}, 
    ${TaskDao.Title}, 
    ${TaskDao.Description}, 
    ${TaskDao.CreatedAt}, 
    ${TaskDao.DeletedAt}
  `;

  public static map(row: QueryResultRow): Task {
    return new Task(
      row[TaskDao.Id],
      row[TaskDao.Title],
      row[TaskDao.Description],
      new Date(row[TaskDao.CreatedAt]).toISOString(),
      (row[TaskDao.DeletedAt]) ? new Date(row[TaskDao.DeletedAt]).toISOString() : undefined
    );
  }

}
