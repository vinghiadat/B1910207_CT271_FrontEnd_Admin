import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RegistrationRoomComponent } from './registration-room/registration-room.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { ServiceComponent } from './service/service.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { InformationComponent } from './information/information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AddRoomTypeComponent } from './add-room-type/add-room-type.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'side-bar', component: SideBarComponent },
      { path: 'registration-room', component: RegistrationRoomComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'roomtype', component: RoomTypeComponent },
      { path: 'information', component: InformationComponent },
      { path: 'password', component: ChangePasswordComponent },
      { path: 'roomtype', component: RoomTypeComponent },
      { path: 'add-room-type', component: AddRoomTypeComponent },
      { path: 'rooms/:id', component: RoomsComponent },
      { path: '', redirectTo: '/registration-room', pathMatch: 'full' },
      // Thêm các đường dẫn cho các trang khác ở đây
    ],
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [{ path: '', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
