import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode'; // Importa jwtDecode y JwtPayload

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Método para registrar un nuevo usuario
  register(name: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      role,
    });
  }

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true si hay un token, false si no
  }

  // Decodificar el token JWT para obtener los datos del usuario
  getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token); // Decodificar el payload del token
        return decodedToken;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  getAuth(): HttpHeaders {
    const token = this.getToken(); // Obtén el token del usuario autenticado

    // Configura el encabezado Authorization con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return headers;
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token'); // Eliminar el token
    this.router.navigate(['/login']); // Redirigir al formulario de inicio de sesión
  }
}