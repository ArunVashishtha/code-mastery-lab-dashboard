import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {
  collection = 'chapters';
  constructor(private afs: FirestoreService, private toaster: ToastrService,
    private storage: AngularFireStorage,
    private router: Router) { }
    saveData(chapterData:any) {
      this.afs.createDocument(this.collection, chapterData)
        .then(() => {
          this.toaster.success('Chapter added successfully!');
        })
        .catch((error: any) => {
          console.error('Error adding chapter: ', error);
        });
    }
  
    updateData(id: string, postData: any) {
      this.afs.updateDocument(this.collection, id, postData).then(() => {
        this.toaster.success('Data updated successfully');
        this.router.navigate(['/chapters']);
      });
    }
  
    loadData() {
      return this.afs.getDocumentsInCollection(this.collection);
    }
  
    loadOneData(id:string) {
     return this.afs.getDocumentById(this.collection, id);
    }
  
    deleteData(id: string) {
      this.afs.deleteDocument(this.collection, id).then(() => {
        this.toaster.info("Deleted successfully");
      });
    }
  
    updateChapterFeatureEnable(id:string, featureData:any) {
      this.afs.updateDocument(this.collection, id, featureData).then(() => {
        this.toaster.success('Feature updated successfully');
      });
    }
  
    
  uploadImage(selectedImage: any, postData: any, formStatus: string, id: string) {
    if (selectedImage) {
      this.afs.getCurrentUserUid().then(userId => {
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
                    postData.image = url;
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
      });
    }
  }
}
