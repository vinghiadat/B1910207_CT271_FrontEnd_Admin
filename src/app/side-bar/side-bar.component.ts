import { Component } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private authService: AuthService,
    private router: Router){}
handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
