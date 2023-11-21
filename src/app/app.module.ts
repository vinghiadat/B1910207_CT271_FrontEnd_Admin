import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RegistrationRoomComponent } from './registration-room/registration-room.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { ServiceComponent } from './service/service.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { InformationComponent } from './information/information.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    RegistrationRoomComponent,
    FooterComponent,
    LoginComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    ServiceComponent,
    RoomTypeComponent,
    ChangePasswordComponent,
    InformationComponent,
    RoomsComponent,
    AddRoomTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,

    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
