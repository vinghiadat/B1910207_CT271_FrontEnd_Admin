import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { Auth } from 'src/app/Models/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  form: any;
  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/contract']);
    }
  }

  onSubmit() {
    if (this.form.value.username === '' || this.form.value.password === '') {
      Swal.fire(
        'Đăng nhập thất bại',
        'Vui lòng điền đầy đủ thông tin',
        'error'
      );
    }
    if (this.form.invalid) {
      return;
    }
    this.authService.login(
      new Auth(this.form.value.username, this.form.value.password)
    );
  }
}
