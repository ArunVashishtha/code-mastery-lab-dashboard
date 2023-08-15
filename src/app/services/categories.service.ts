import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: AngularFirestore, private toaster: ToastrService) {}

  saveData(categoryData: any) {
    this.afs.collection('categories').add(categoryData).then((docref) => {
      this.loadData();
      this.toaster.success('Data Insert Successfully ..!');
    });
  }

  loadData() {
    return this.afs.collection('categories').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  updateData(id: any, editData: any) {
    this.afs.collection('categories').doc(id).update(editData).then(docRef => {
      this.toaster.success('Data updated Successfully');
    })
  }

  deleteData(id: string) {
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      this.toaster.info("Deleted successfully");
    });
  }
}
