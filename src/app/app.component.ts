import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reserv-frontend';
  esLoginPage = false;
  loading = false;
  loaderEliminado = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        // Mostrar u ocultar el header
        this.esLoginPage = ['/login', '/register'].includes(url);

        // Simular tiempo de carga
        setTimeout(() => {
          this.loading = false;
        }, 2500);

        // 💥 Desvanecer el loader inicial SOLO una vez
        if (!this.loaderEliminado) {
          const loader = document.getElementById('loader');
          if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 1000);
            this.loaderEliminado = true;
          }
        }
      }
    });
  }
}
