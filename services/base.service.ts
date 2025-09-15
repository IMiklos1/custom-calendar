import firebase from "firebase/compat/app";
import { firestore } from "../firebase";

/**
 * Generic Firestore CRUD Service
 * @template T - Type of the model
 */
export class BaseService<T extends { id?: string }> {
    private collectionRef: firebase.firestore.CollectionReference;

    constructor(collectionPath: string) {
        this.collectionRef = firestore.collection(collectionPath);
    }

    async getById(id: string): Promise<T | null> {
        const doc = await this.collectionRef.doc(id).get();
        return doc.exists ? ({ id: doc.id, ...doc.data() } as T) : null;
    }

    async getAll(): Promise<T[]> {
        const snapshot = await this.collectionRef.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
    }

    async create(data: Omit<T, "id">): Promise<string> {
        const docRef = await this.collectionRef.add(data);
        return docRef.id;
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this.collectionRef.doc(id).update(data);
    }

    async delete(id: string): Promise<void> {
        await this.collectionRef.doc(id).delete();
    }

    /**
     * Realtime listener
     */
    onSnapshot(callback: (items: T[]) => void) {
        return this.collectionRef.onSnapshot((snapshot) => {
            const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
            callback(items);
        });
    }
}
