import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard = false;
  constructor(private afAuth: AngularFireAuth, private toaster: ToastrService,
  private router: Router) { }

  login(email:string, password:string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(logRef => {
      this.toaster.success('Login Success');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.toaster.warning(err);
    });
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      const useremail = user?.email;
      if (useremail) {
        localStorage.setItem('useremail', useremail);
      }
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('useremail');
      this.isLoggedInGuard = false;
      this.toaster.success('User logout successfully');
      this.loggedIn.next(false);
      this.router.navigate(['/']);
    })
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
