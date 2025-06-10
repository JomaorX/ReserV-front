import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notificacion.service';
import { ServiceService } from '../../services/service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from './reservation-modal/reservation-modal.component';
import { SalonService } from '../../services/salon.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";




@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    SidebarComponent
],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.scss'],
})
export class SalonDetailComponent implements OnInit {
  salonId: string = '';
  salon: any = null;
  services: any[] = [];
  modalAbierto: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
    private serviceService: ServiceService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.salonId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarSalon();
    this.loadServices();
  }

  cargarSalon(): void {
    this.salonService.getSalonById(+this.salonId).subscribe({
      next: (data) => (this.salon = data),
      error: (err) => this.handleError('Error al cargar la peluquería', err),
    });
  }

  loadServices(): void {
    this.serviceService.getServicesBySalon(+this.salonId).subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        console.error('Error al obtener los servicios:', error);
        this.notificationService.showError('Error al obtener los servicios.');
      },
    });
  }

  abrirModalReserva(service: any): void {
    this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { service, salonId: this.salonId },
    });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.notificationService.showError(message);
  }
}

