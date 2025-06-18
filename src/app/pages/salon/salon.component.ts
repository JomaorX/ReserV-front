import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notificacion.service';
import { SalonService } from '../../services/salon.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.scss',
})
export class SalonComponent implements OnInit {
  salonForm: FormGroup;
  salon: any = null;
  bannerPreview: string | null = null;
  map: any;
  mapVisible = false;

  constructor(
    private salonService: SalonService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.salonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      openingHours: new FormControl('', [Validators.required]),
      bannerUrl: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadSalon();
  }

  loadSalon(): void {
    const userData: any = this.authService.getUserData(); // Obtener el ID del salón desde el token
    const salonId = userData.salonId;
    this.salonService.getSalonById(+salonId).subscribe({
      next: (data) => {
        console.log("Respuesta del salon",data);
        this.salon = data[0]
        this.salonForm.patchValue(this.salon);
        this.bannerPreview = this.salon.bannerUrl || null;
        this.geocodeAddress(data.location);
      },
      error: (error) => {
        console.error('Error al cargar el salón:', error);
        this.notificationService.showError('Error al cargar el salón.');
      },
    });
  }

  onBannerSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const formData = new FormData();
      formData.append('image', input.files[0]);

      this.http
        .post<{ imageUrl: string }>(
          'http://localhost:3000/api/upload-image',
          formData
        )
        .subscribe({
          next: (res) => {
            this.bannerPreview = res.imageUrl;
            this.salonForm.patchValue({ bannerUrl: res.imageUrl });
            this.notificationService.showSuccess(
              'Banner subido correctamente.'
            );
          },
          error: (error) => {
            console.error('Error al subir banner:', error);
            this.notificationService.showError('Error al subir el banner.');
          },
        });
    }
  }

  saveSalon(): void {
    if (this.salonForm.valid) {
      const data = this.salonForm.value;

      if (this.salon) {
        this.salonService.updateSalon(this.salon.id, data).subscribe({
          next: (res) => {
            this.notificationService.showSuccess(
              'Salón actualizado correctamente.'
            );
            this.bannerPreview = res.salon.bannerUrl;
            this.geocodeAddress(data.location);
          },
          error: (error) => {
            console.error('Error al actualizar el salón:', error);
            this.notificationService.showError('Error al actualizar el salón.');
          },
        });
      } else {
        this.salonService.createSalon(data).subscribe({
          next: (res) => {
            const newToken = res.token;
            console.log('RESPUESTA', res);
            if (newToken) {
              const tokViejo = localStorage.getItem('token');
              console.log('Token viejo', tokViejo);
              const tokNuevo = localStorage.setItem('token', newToken); // ✅ Guardar el nuevo token con el salonId actualizado
              console.log('Token nuevo', newToken);
            }
            this.notificationService.showSuccess(
              'Salón registrado correctamente.'
            );
            this.bannerPreview = res.salon.bannerUrl;
            this.geocodeAddress(data.location);
            this.loadSalon();
          },
          error: (error) => {
            console.error('Error al registrar el salón:', error);
            this.notificationService.showError('Error al registrar el salón.');
          },
        });
      }
    } else {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos correctamente.'
      );
    }
  }

  geocodeAddress(address: string): void {
    this.http
      .get<any[]>(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      )
      .subscribe({
        next: (results) => {
          if (results.length > 0) {
            const lat = parseFloat(results[0].lat);
            const lon = parseFloat(results[0].lon);
            this.initMap(lat, lon);
            this.mapVisible = true;
          }
        },
        error: (err) => {
          console.error('Error al geocodificar dirección:', err);
          this.notificationService.showError(
            'Error al obtener la ubicación del salón.'
          );
        },
      });
  }

  initMap(lat: number, lng: number): void {
    setTimeout(() => {
      if (this.map) {
        this.map.remove();
      }

      this.map = L.map('map', {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      }).addTo(this.map);

      this.map.whenReady(() => {
        this.map.invalidateSize();
      });
    }, 0);
  }
}
