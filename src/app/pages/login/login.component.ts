import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  errorMessage: string = ''; // Para mostrar mensajes de error del backend

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          // Guardar el token en localStorage
          localStorage.setItem('token', response.token);

          // Obtener datos del usuario desde el token
          const userData: any = this.authService.getUserData();

          // Redirigir según el rol
          if (userData && userData.role === 'admin') {
            this.notificationService.showSuccess('Bienvenido, administrador');
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.notificationService.showSuccess('Inicio de sesión exitoso');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          this.notificationService.showError(
            'Credenciales incorrectas. Inténtalo de nuevo.'
          );
        },
      });
    } else {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos correctamente.'
      );
      console.log('Formulario inválido');
    }
  }
}