import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = 'codemasterylab@gmail.com';
  isLoggedIn$: Observable<boolean> | undefined;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('useremail');
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogOut() {
    this.authService.logOut();
  }

}
