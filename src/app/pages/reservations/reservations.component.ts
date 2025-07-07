import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { NotificationService } from '../../services/notificacion.service';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";

@Component({
  selector: 'app-reservations',
  imports: [SidebarComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
  reservas: any[] = [];

  constructor (
    private reservationService: ReservationService,
    private notificationService: NotificationService
  ) {}
  
  ngOnInit(): void {
    this.getReservas();
  }

  getReservas (){
    this.reservationService.getSalonReservations().subscribe({
      next: (data) => {
        this.reservas = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error al obtener las reservas:', error);
        this.notificationService.showError('Error al obtener las reservas.');
      }
    })

  }
}
