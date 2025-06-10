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

@Component({
  selector: 'app-salon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private notificationService: NotificationService
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
    this.salonService.getMySalon().subscribe({
      next: (data) => {
        this.salon = data;
        this.salonForm.patchValue(data);
        this.bannerPreview = data.bannerUrl || null;
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
