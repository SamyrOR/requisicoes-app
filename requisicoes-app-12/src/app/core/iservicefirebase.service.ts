import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from './model';
import { ICrud } from './icrud.interface';
import { plainToClass } from 'class-transformer';

export abstract class ServiceFirebase<T extends Model> implements ICrud<T> {
  ref!: AngularFirestoreCollection<T>;
  constructor(
    protected type: { new (): T },
    protected firestore: AngularFirestore,
    public path: string
  ) {
    this.ref = this.firestore.collection<T>(this.path);
  }

  docToClass(snapshotDoc: any): T {
    let obj = {
      ...(snapshotDoc.data() as T),
    };
    let typed = plainToClass(this.type, obj);
    return typed;
  }

  get(id: string): Observable<T> {
    let doc = this.ref.doc<T>(id);
    return doc.get().pipe(map((snapshot) => this.docToClass(snapshot)));
  }

  list(): Observable<T[]> {
    return this.ref.valueChanges();
  }

  createOrUpdate(item: T): Promise<any> | undefined {
    let id = item.id;
    if (!item) return;
    let obj: any = null;

    if (item instanceof this.type) obj = item.toObject();
    else obj = item;
    if (id) {
      return this.ref.doc(id).set(obj);
    } else
      return this.ref.add(obj).then((res) => {
        obj.id = res.id; // Para salvar com o atributo id
        this.ref.doc(res.id).set(obj);
      });
  }
  delete(id: string): Promise<void> {
    return this.ref.doc(id).delete();
  }
}
