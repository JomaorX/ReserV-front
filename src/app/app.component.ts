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

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        // Header oculto solo en login y register
        this.esLoginPage = ['/login', '/register'].includes(url);

        // Delay del loader
        setTimeout(() => {
          this.loading = false;
        }, 2500);
      }
    });
  }
}
