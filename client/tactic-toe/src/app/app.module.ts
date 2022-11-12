import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { YourAiComponent } from './your-ai/your-ai.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AiInfoComponent } from './ai-info/ai-info.component';
import { AiListComponent } from './ai-list/ai-list.component';
import { RobotSvgComponent } from './robot-svg/robot-svg.component';

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
    YourAiComponent,
    AboutComponent,
    HomeComponent,
    AiInfoComponent,
    AiListComponent,
    RobotSvgComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
