import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FileUploadService } from './fileupload.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  collection = 'posts';
  constructor(private afs: FirestoreService, private storage: AngularFireStorage, private toaster: ToastrService,
    private router: Router,
    private fireauth: FirestoreService) { }

  uploadImage(selectedImage: any, postData: any, formStatus: string, id: string) {
    if (selectedImage) {
      this.fireauth.getCurrentUserUid().then(userId => {
        if (userId) {
          // Generate a unique ID for the image
          const imageId = Math.random().toString(36).substring(2);

          // Construct the path to the image in storage
          const path = `images/${userId}/${imageId}_${selectedImage.name}`;

          // Upload the image
          const ref = this.storage.ref(path);
          const task = ref.put(selectedImage);

          task.snapshotChanges().subscribe(
            (snapshot: any) => {
              if (snapshot.state === 'success') {
                console.log('Image uploaded successfully');
                ref.getDownloadURL().subscribe(url => {
                  if (url) {
                    postData.postImgPath = url;
                    if (formStatus == 'Edit') {
                      this.updateData(id, postData);
                    } else {
                      this.saveData(postData);
                    }
                  }
                });
              }
            },
            (error) => {
              console.error('Error uploading image:', error);
            }
          );
        }
      })
    }
  }

  saveData(postData: any) {
    this.afs.createDocument(this.collection, postData).then((docRef: any) => {
      this.toaster.success('Data Insert Successfully.')
      this.router.navigate(['/posts']);
    })
  }

  updateData(id: string, postData: any) {
    this.afs.updateDocument(this.collection, id, postData).then(() => {
      this.toaster.success('Data updated successfully');
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.afs.getDocumentsInCollection(this.collection);
  }

  loadOneData(id: string) {
    return this.afs.getDocumentById(this.collection, id);
  }

  deleteImage(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id)
    });
  }
  deleteData(id: string) {
    this.afs.deleteDocument(this.collection, id).then(() => {
      this.toaster.info("Deleted successfully");
    });
  }

  updatePostFeatureEnable(id: string, featureData: any) {
    this.afs.updateDocument(this.collection, id, featureData).then(() => {
      this.toaster.success('Feature updated successfully');
    });
  }
}
