import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

export function createConverter<T extends DocumentData>(): FirestoreDataConverter<T> {
  return {
    toFirestore(model: T): DocumentData {
      return { ...model };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
      return snapshot.data(options) as T;
    }
  };
}
