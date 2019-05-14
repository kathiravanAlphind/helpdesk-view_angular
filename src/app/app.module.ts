import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LoginComponent} from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ProjectComponent } from './dashboard/projects.component';
import { TicketComponent } from './tickets/tickets.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent,ProjectComponent, TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
