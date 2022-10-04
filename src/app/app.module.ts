import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserComponent } from './user/user.component';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { dashboardService } from './dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    dashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
