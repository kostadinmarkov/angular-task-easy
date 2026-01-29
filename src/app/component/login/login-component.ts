import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/service/auth.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login-component',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  protected error = '';
  protected signInForm: FormGroup = new FormGroup({
    username: new FormControl(
      '',
      [Validators.required, Validators.minLength(3)]
    ),
    password: new FormControl(
      '',
      [Validators.required, Validators.minLength(6)]
    )
  });

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  onSubmit(): void {
    if (!this.signInForm.value.username || !this.signInForm.value.password) {
      return;
    }

    const user = this.authService.login(this.signInForm.value.username, this.signInForm.value.password);

    if (user) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
