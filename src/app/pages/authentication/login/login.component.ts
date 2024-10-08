import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService // Injetando o serviço de autenticação
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const userLogin = {
      email: this.form.value.email,
      password: this.form.value.password
    } as User;

    this.authService.login(userLogin).subscribe({
      next: (response) => {
        this.router.navigate(['/dashboard']); // Redireciona para o dashboard em caso de sucesso
      },
      error: (err) => {
        console.error('Login failed', err);
        // Exibir mensagem de erro para o usuário, se necessário
      }
    });
  }
}
