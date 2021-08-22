import { Observable } from 'rxjs';

export interface ICrud<T> {
  get(id: string): Observable<T>;
  list(): Observable<T[]>;
  createOrUpdate(item: T): Promise<any> | undefined;
  delete(id: string): Promise<void>;
}
