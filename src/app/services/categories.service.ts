import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  collectionName = 'categories';
  constructor(private fs: AngularFirestore,
    private afs: FirestoreService, private toaster: ToastrService) { }

  saveData(categoryData: any) {
        this.afs.createDocument(this.collectionName, categoryData).then(() => {
          this.loadData();
          this.toaster.success('Data Insert Successfully ..!');
        });
  }

  loadData() {
    return this.afs.getDocumentsInCollection(this.collectionName);
  }

  updateData(id: any, editData: any) {
    this.afs.updateDocument(this.collectionName, id, editData).then(() => {
      this.toaster.success('Data updated Successfully');
    });
  }

  deleteData(id: string) {
    this.afs.deleteDocument(this.collectionName, id).then(docRef => {
      this.toaster.info("Deleted successfully");
    });
  }
}
