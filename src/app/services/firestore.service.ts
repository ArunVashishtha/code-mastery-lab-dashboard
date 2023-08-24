import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  getCurrentUserUid(): Promise<string | null> {
    return this.auth.currentUser.then(user => {
      return user ? user.uid : null;
    });
  }

  // Create a document
  createDocument(collectionName: string, data: any): Promise<any> {
    return this.getCurrentUserUid().then(uid => {
      if (uid) {
        const documentData = {
          ...data,
          author_uid: uid,
        };

        return this.firestore.collection(collectionName).add(documentData);
      } else {
        throw new Error('User is not authenticated.');
      }
    });
  }

  // Update a document
  updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
    return this.getCurrentUserUid().then(uid => {
      if (uid) {
        const documentData = {
          ...data,
          author_uid: uid,
        };
        const documentRef = this.firestore.collection(collectionName).doc(documentId);

        return documentRef.update(documentData);
      } else {
        throw new Error('User is not authenticated.');
      }
    });
  }

  // Delete a document
  deleteDocument(collectionName: string, documentId: string): Promise<void> {
    return this.getCurrentUserUid().then(uid => {
      if (uid) {
        const documentRef = this.firestore.collection(collectionName).doc(documentId);
        return documentRef.delete();
      } else {
        throw new Error('User is not authenticated.');
      }
    });
  }

  // Get a document by ID
  getDocumentById(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).valueChanges();
  }

  // Get documents in a collection
  getDocumentsInCollection(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }
}
