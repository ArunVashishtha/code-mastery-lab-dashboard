import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class QueriesServiceService {
  collection = 'contactFormSubmissions';
  constructor(private afs: FirestoreService,
  private toastr: ToastrService) { }

  loadData() {
    return this.afs.getDocumentsInCollection(this.collection);
  }

  deleteData(id: string) {
    this.afs.deleteDocument(this.collection, id).then(docRef => {
      this.toastr.info("Deleted successfully");
    }).catch(err => {
      this.toastr.error(err);
    });
  }
}
