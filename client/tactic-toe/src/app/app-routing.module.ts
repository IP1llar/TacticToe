import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { BattleComponent } from './battle/battle.component';
import { CreateAnAiComponent } from './create-an-ai/create-an-ai.component';

import { LoginComponent } from './login/login.component';
import { MatchComponent } from './match/match.component';
import { RegisterComponent } from './register/register.component';
import { TrainComponent } from './train/train.component';


const routes: Routes = [
  { path: 'yourai', component: CreateAnAiComponent, canActivate: [AuthGuard]},
  { path: 'train/:id', component: TrainComponent, canActivate: [AuthGuard]},
  { path: 'battle', component: BattleComponent, canActivate: [AuthGuard]}, 
  { path: 'battle/:id', component: MatchComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '/yourai', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
