import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  public loginForm: FormGroup;
  public error: string | null = null;
  public isLoading: boolean = false;

  public employee;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.employee = this.authService.employee;

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.employee()) {
      this.router.navigate(['/home']);
    }
  }

  public async login(): Promise<void> {
    this.isLoading = true;
    try {
      await this.authService.auth(this.loginForm.value.email, this.loginForm.value.password);
    }
    catch (error: any) {
      this.error = error?.message
    }
    finally {
      this.isLoading = false;
    }
  }
}
