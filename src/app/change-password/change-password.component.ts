import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { Admin } from '../Models/admin/admin';
import Swal from 'sweetalert2';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/user/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  admin!: User;
  oldPassword: string = '';
  newPassword: string = '';
  newPassword2: string = '';
  ngOnInit(): void {
    this.userService
      .getUserByUsername(this.authService.getUsername())
      .subscribe({
        next: (response: User) => {
          this.admin = response;
        },
        error: (error) => {},
      });
  }
  changePassword() {
    if (
      this.oldPassword == '' ||
      this.newPassword == '' ||
      this.newPassword2 == ''
    ) {
      Swal.fire('Thất bại', 'Nhập đầy đủ thông tin', 'error');
      return;
    }
    if (this.newPassword != this.newPassword2) {
      Swal.fire('Thất bại', 'Mật khẩu mới nhập lại phải giống nhau', 'error');
      return;
    }
    let password = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
    this.authService
      .changePassword(this.authService.getUsername(), password)
      .subscribe({
        next: (response: void) => {
          Swal.fire('Thành công', 'Đổi mật khẩu thành công', 'success');
          this.oldPassword = '';
          this.newPassword = '';
          this.newPassword2 = '';
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
  }
}
