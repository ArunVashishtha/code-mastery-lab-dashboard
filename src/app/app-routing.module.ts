import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubscriberComponent } from './subscriber/subscriber.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'subscribers', component: SubscriberComponent, canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate:[AuthGuard] },
  { path: 'posts', component: AllPostComponent, canActivate:[AuthGuard] },
  { path: 'posts/new', component: NewPostComponent, canActivate:[AuthGuard] },
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
