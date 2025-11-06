import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  submitted = false;
  error = '';

  private fb = inject(FormBuilder);

  constructor(private auth: AuthService, private router: Router) {}

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }

    this.auth.login(this.form.value as any).subscribe({  
      next: res => {
        this.auth.handleLogin(res);
        // If admin, go to admin dashboard; else to home
        const target = res.user.role === 'admin' ? '/admin' : '/';
        this.router.navigateByUrl(target);
      },
      error: (err) => {
        this.error = 'Невалидни данни за вход.';
      }
    });
  }

}
