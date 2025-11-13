import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service';
import { User } from '../../../@shared/types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  public loginForm: FormGroup;
  public error;
  public isLoading;

  public user;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
    this.error = this.authService.error;
    this.isLoading = this.authService.isLoading;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.user()) {
      this.router.navigate(['/home']);
    }
  }

  public login(): void {
    this.authService.auth(this.loginForm.value.email, this.loginForm.value.password);
  }
}
