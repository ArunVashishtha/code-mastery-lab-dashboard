import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private toaster: ToastrService,
  private router: Router) { }

  uploadImage(selectedImage: any, postData: any, formStatus:string, id:string) {
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('Post image upload successfully.');
      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImgPath = URL;
        if (formStatus == 'Edit') {
          this.updateData(id, postData);
        } else {
          this.saveData(postData);
        }
      })
    });
  }

  saveData(postData:any) {
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toaster.success('Data Insert Successfully.')
      this.router.navigate(['/posts']);
    })
  }

  updateData(id: string, postData: any) {
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toaster.success('Data updated successfully');
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data };
      })
    }));
  }

  loadOneData(id:string) {
   return this.afs.doc(`posts/${id}`).valueChanges();
  }

  deleteImage(postImgPath:string, id:string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id)
    });
  }
  deleteData(id: string) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toaster.info("Deleted successfully");
    });
  }

  updatePostFeatureEnable(id:string, featureData:any) {
    this.afs.doc(`posts/${id}`).update(featureData).then(() => {
      this.toaster.success('Feature updated successfully');
    });
  }
}
