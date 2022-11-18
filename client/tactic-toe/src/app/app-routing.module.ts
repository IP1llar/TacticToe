import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { BattleComponent } from './battle/battle.component';
import { BoardComponent } from './board/board.component';
import { CreateAnAiComponent } from './create-an-ai/create-an-ai.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatchComponent } from './match/match.component';
import { RegisterComponent } from './register/register.component';
// import { StatsComponent } from './stats/stats.component';
import { TrainComponent } from './train/train.component';
// import { YourAiComponent } from './your-ai/your-ai.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, // TODO: think about putting back
  { path: 'create', component: CreateAnAiComponent, canActivate: [AuthGuard]},
  { path: 'yourai', component: CreateAnAiComponent, canActivate: [AuthGuard]},
  {path: 'train/:id', component: TrainComponent, canActivate: [AuthGuard]},
  {path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard]},
  {path: 'battle', component: BattleComponent, canActivate: [AuthGuard]}, // TODO: Add guard for number of ai (can't access with no AI)
  {path: 'battle/:id', component: MatchComponent, canActivate: [AuthGuard]}, // TODO: Add guard for number of ai (can't access with no AI)
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
