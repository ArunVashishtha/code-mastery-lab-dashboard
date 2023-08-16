import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private toaster: ToastrService,
    private router: Router) { }
    saveData(chapterData:any) {
      this.afs.collection('chapters').add(chapterData)
        .then(() => {
          this.toaster.success('Chapter added successfully!');
        })
        .catch(error => {
          console.error('Error adding chapter: ', error);
        });
    }
  
    updateData(id: string, postData: any) {
      this.afs.doc(`chapters/${id}`).update(postData).then(() => {
        this.toaster.success('Data updated successfully');
        this.router.navigate(['/chapters']);
      });
    }
  
    loadData() {
      return this.afs.collection('chapters').snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data };
        })
      }));
    }
  
    loadOneData(id:string) {
     return this.afs.doc(`chapters/${id}`).valueChanges();
    }
  
    deleteData(id: string) {
      this.afs.doc(`chapters/${id}`).delete().then(() => {
        this.toaster.info("Deleted successfully");
      });
    }
}
