import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { BoardComponent } from './board/board.component';
import { CreateAnAiComponent } from './create-an-ai/create-an-ai.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { YourAiComponent } from './your-ai/your-ai.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'create', component: CreateAnAiComponent, canActivate: [AuthGuard]},
  { path: 'yourai', component: CreateAnAiComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
