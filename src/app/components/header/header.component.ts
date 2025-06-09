import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
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
