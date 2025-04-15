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
  errorMessage: string = ''; // Para mostrar mensajes de error del backend

  constructor(private authService: AuthService) {
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.registerForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;

      // Llamada al backend usando AuthService
      this.authService.register(name, email, password); // ✅ Solo llamamos a .subscribe() dentro del servicio
    } else {
      console.log('Formulario inválido');
    }
  }
}
