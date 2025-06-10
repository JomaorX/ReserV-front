import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notificacion.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  userData: any;

  constructor(
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  logout(): void {
    this.authService.logout();
    this.notificationService.showSuccess('Has cerrado sesión correctamente.');
  }

  ngOnInit(): void {
    // Obtener los datos del usuario desde el token
    this.userData = this.authService.getUserData();

    // Si no hay datos de usuario, redirigir al inicio de sesión
    if (!this.userData) {
      this.notificationService.showError(
        'No estás autenticado. Redirigiendo al inicio de sesión...'
      );
      this.authService.logout();
    }
  }
}
