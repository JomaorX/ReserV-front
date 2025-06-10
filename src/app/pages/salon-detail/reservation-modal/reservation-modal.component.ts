import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatTimepickerModule,
  MatTimepickerOption,
} from '@angular/material/timepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { NotificationService } from '../../../services/notificacion.service';
import { EmployeeService } from '../../../services/employee.service';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTimepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss'],
})
export class ReservationModalComponent implements OnInit {
  reservationForm: FormGroup;
  salonId!: number;
  serviceId!: number;
  barbers: any[] = [];
  availableHours: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reservationService: ReservationService,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {
    this.reservationForm = new FormGroup({
      barberId: new FormControl(null, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.salonId = this.data.salonId;
    this.serviceId = this.data.service.id;
    this.loadBarbers();
    this.generateAvailableHours();
  }

  myFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const day = d.getDay();
    return day !== 0 && day !== 6; // bloquea sábados y domingos
  };

  generateAvailableHours(): void {
    const startHour = 9;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      this.availableHours.push(`${hour}:00`);
      this.availableHours.push(`${hour}:30`);
    }
  }

  loadBarbers(): void {
    this.employeeService.getEmployeesBySalon(this.salonId).subscribe({
      next: (data) => (this.barbers = data),
      error: () =>
        this.notificationService.showError('Error al cargar los peluqueros'),
    });
  }

  onSubmit(): void {
    if (this.reservationForm.invalid) {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos.'
      );
      return;
    }

    const reservationData = {
      salonId: Number(this.salonId),
      serviceId: this.serviceId,
      barberId: this.reservationForm.value.barberId,
      date: this.reservationForm.value.date,
      time: this.reservationForm.value.time,
    };

    console.log("Valores de la reserva al enviar",reservationData);

    this.reservationService.createReservation(reservationData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Reserva realizada con éxito.');
        this.dialogRef.close(true);
      },
      error: () =>
        this.notificationService.showError('Error al realizar la reserva'),
    });
  }
}
