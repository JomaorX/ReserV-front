import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado y es administrador
  const userData: any = authService.getUserData();
  if (userData?.role === 'admin') {
    return true; // Permitir acceso si el usuario es administrador
  } else {
    router.navigate(['/login']); // Redirigir al inicio de sesión si no es administrador
    return false;
  }
};
