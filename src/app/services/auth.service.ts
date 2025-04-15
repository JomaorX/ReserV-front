import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).subscribe({
      next: (response: any) => {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.token);
        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      },
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password }).subscribe({
      next: () => {
        alert('Registro exitoso. Por favor, inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error en el registro:', error);
        alert('Error al registrar. Inténtalo de nuevo.');
      },
    });
  }

  // Obtener el token desde localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true si hay un token, false si no
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Eliminar el token
    this.router.navigate(['/login']); // Redirigir al formulario de inicio de sesión
  }
}