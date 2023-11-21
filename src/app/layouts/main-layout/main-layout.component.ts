import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Models/admin/admin';
import { User } from 'src/app/Models/user/user';
import { AdminService } from 'src/app/Services/admin/admin.service';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  admin!: User ;
  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['/login']);
    }
    this.authService
      .getUserByUsername(this.authService.getUsername())
      .subscribe({
        next: (response: User) => {
          this.admin = response;
        },
        error: (error) => {},
      });
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
