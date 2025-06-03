import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  registerForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  role: FormControl; // Nuevo campo para el rol
  errorMessage: string = ''; // Para mostrar mensajes de error del backend

  constructor(private authService: AuthService) {
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.role = new FormControl('client'); // Valor por defecto: 'client'

    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role, // Añadimos el campo role al formulario
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, role } = this.registerForm.value;

      this.authService.register(name, email, password, role).subscribe({
        next: () => {
          alert('Registro exitoso. Por favor, inicia sesión.');
          this.authService.logout(); // Redirige al formulario de inicio de sesión
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error al registrar. Inténtalo de nuevo.');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
