import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateAnAiComponent } from './create-an-ai/create-an-ai.component';
import { AboutComponent } from './about/about.component';
import { AiInfoComponent } from './ai-info/ai-info.component';
import { AiListComponent } from './ai-list/ai-list.component';
import { RobotSvgComponent } from './robot-svg/robot-svg.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { TrainComponent } from './train/train.component';
import { StatsComponent } from './stats/stats.component';
import { StatboardComponent } from './statboard/statboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { EditComponent } from './edit/edit.component';
import { BattleComponent } from './battle/battle.component';
import { AiBattleListComponent } from './ai-battle-list/ai-battle-list.component';
import { AiBattleInfoComponent } from './ai-battle-info/ai-battle-info.component';
import { MatchComponent } from './match/match.component';
import { MatchBoardComponent } from './match-board/match-board.component';
import { InfoSvgComponent } from './info-svg/info-svg.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    ChartComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CreateAnAiComponent,
    AboutComponent,
    AiInfoComponent,
    AiListComponent,
    RobotSvgComponent,
    CreateFormComponent,
    TrainComponent,
    StatsComponent,
    StatboardComponent,
    EditPageComponent,
    EditComponent,
    BattleComponent,
    AiBattleListComponent,
    AiBattleInfoComponent,
    MatchComponent,
    MatchBoardComponent,
    InfoSvgComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// TODO: Make favicon