import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import { Admin } from '../Models/admin/admin';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/user/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css'],
})
export class InformationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  admin!: User;
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
}
