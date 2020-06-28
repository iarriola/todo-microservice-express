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
  search(item: T): Promise<T[]>;
}

export class Task {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

}
