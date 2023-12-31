import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Auth } from 'src/app/Models/auth/auth';
import { User } from 'src/app/Models/user/user';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  //Lấy role
  getRoles(username: string): Observable<string[]> {
    return this.http.get<string[]>(
      this.getFullUrl(`api/v1/user/role/${username}`)
    );
  }

  //set user
  setUsername(username: string): void {
    localStorage.setItem('username', JSON.stringify(username));
  }

  //get user
  getUsername(): string {
    const userString = localStorage.getItem('username');
    return userString != null ? JSON.parse(userString) : null;
  }

  //đăng xuất
  logout(): any {
    if (this.getUsername() != null) {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }

  //đăng nhập
  login(auth: Auth): void {
    this.http
      .post(this.getFullUrl('api/v1/user/login'), auth)
      .pipe(
        tap((response: any) => {
          console.log(response);
          if (response.accessToken) {
            //Lưu trữ user nếu cần dùng
            this.setUsername(auth.getUsername());
            // lưu trữ token
            localStorage.setItem('accessToken', response.accessToken);
            //Kiểm duyệt vai trò
            this.getRoles(auth.getUsername()).subscribe((roles) => {
              if (roles.includes('CUSTOMER')) {
                this.router.navigate(['/home']);
              } else {
                this.router.navigate(['/']);
              }
            });
          }
        }),
        catchError((error) => {
          if (error.status === 401) {
            console.log('Thất bại');
          }
          throw error;
        })
      )
      .subscribe();
  }
  changePassword(username: string, password: any): Observable<void> {
    return this.http.put<void>(
      this.getFullUrl(`api/v1/user/change-password/${username}`),
      password
    );
  }
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.getFullUrl(`api/v1/user/${username}`));
  }
}
