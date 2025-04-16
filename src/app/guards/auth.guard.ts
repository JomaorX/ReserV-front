import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado y es cliente
  const userData: any = authService.getUserData();
  if (userData?.role === 'client') {
    return true; // Permitir acceso si el usuario es cliente
  } else {
    router.navigate(['/login']); // Redirigir al inicio de sesión si no es cliente
    return false;
  }
};
