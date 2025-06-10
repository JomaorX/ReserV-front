import { Component } from '@angular/core';
import { UnavailableDayService } from '../../services/unvailable-days.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notificacion.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unvailable-days',
  imports: [ReactiveFormsModule],
  templateUrl: './unvailable-days.component.html',
  styleUrl: './unvailable-days.component.scss',
})
export class UnavailableDaysComponent {
  unavailableForm: FormGroup;
  unavailableDays: any[] = [];

  constructor(
    private unavailableDayService: UnavailableDayService,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.unavailableForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadUnavailableDays();
  }

  loadUnavailableDays(): void {
    const userData: any = this.authService.getUserData(); // Obtener el ID del salón desde el token
    const salonId = userData.salonId;
    console.log('Salon asignado : ', salonId, 'userData :', userData);
    if (!salonId) {
      this.notificationService.showError('No tienes un salón asignado.');
      return;
    }

    this.unavailableDayService.getUnavailableDaysBySalon(salonId).subscribe({
      next: (data) => {
        this.unavailableDays = data;
      },
      error: (error) => {
        console.error('Error al obtener los días no disponibles:', error);
        this.notificationService.showError(
          'Error al obtener los días no disponibles.'
        );
      },
    });
  }

  addUnavailableDay(): void {
    if (this.unavailableForm.valid) {
      const { date, reason } = this.unavailableForm.value;
      this.unavailableDayService.createUnavailableDay(date, reason).subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Día no disponible agregado correctamente.'
          );
          this.unavailableForm.reset(); // Limpiar el formulario
          this.loadUnavailableDays(); // Recargar la lista
        },
        error: (error) => {
          console.error('Error al agregar el día no disponible:', error);
          this.notificationService.showError(
            'Error al agregar el día no disponible.'
          );
        },
      });
    } else {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos correctamente.'
      );
    }
  }

  deleteUnavailableDay(id: number): void {
    this.notificationService
      .showConfirmation(
        '¿Estás seguro de que deseas eliminar este día no disponible?'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.unavailableDayService.deleteUnavailableDay(id).subscribe({
            next: () => {
              this.notificationService.showSuccess(
                'Día no disponible eliminado correctamente.'
              );
              this.loadUnavailableDays(); // Recargar la lista
            },
            error: (error) => {
              console.error('Error al eliminar el día no disponible:', error);
              this.notificationService.showError(
                'Error al eliminar el día no disponible.'
              );
            },
          });
        }
      });
  }
}