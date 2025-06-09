import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../salon/salon.services';
import { FlatpickrDirective } from '../../shared/flatpickr.directive';
import { NotificationService } from '../../services/notificacion.service';

@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, FlatpickrDirective],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.scss'],
})
export class SalonDetailComponent implements OnInit {
  salonId: string = '';
  salon: any = null;

  // Formulario
  fechaSeleccionada: string = '';
  peluqueroSeleccionado: string = '';
  detalleCita: string = '';
  peluqueros: string[] = ['Juan', 'Marta', 'Luis', 'Ana'];

  // Calendario visual
  calendario = [
    {
      diaSemana: 'Friday',
      dia: 30,
      mes: 'May',
      horas: [
        { hora: '2:00 PM', reservado: false },
        { hora: '3:00 PM', reservado: false },
      ],
    },
    {
      diaSemana: 'Saturday',
      dia: 31,
      mes: 'May',
      horas: [
        { hora: '2:00 PM', reservado: false },
        { hora: '3:00 PM', reservado: false },
      ],
    },
    {
      diaSemana: 'Sunday',
      dia: 1,
      mes: 'June',
      horas: [
        { hora: '2:00 PM', reservado: false },
        { hora: '3:00 PM', reservado: false },
      ],
    },
    {
      diaSemana: 'Monday',
      dia: 2,
      mes: 'June',
      horas: [
        { hora: '2:00 PM', reservado: false },
        { hora: '3:00 PM', reservado: false },
      ],
    },
  ];

  fechasExtendidas = [
    {
      dia: '4',
      mes: 'June',
      diaSemana: 'Wednesday',
      horas: [{ hora: '10:00 AM', reservado: false }],
    },
    {
      dia: '5',
      mes: 'June',
      diaSemana: 'Thursday',
      horas: [{ hora: '11:00 AM', reservado: false }],
    },
    {
      dia: '6',
      mes: 'June',
      diaSemana: 'Friday',
      horas: [{ hora: '12:00 PM', reservado: false }],
    },
    {
      dia: '7',
      mes: 'June',
      diaSemana: 'Saturday',
      horas: [{ hora: '1:00 PM', reservado: false }],
    },
  ];

  diaSeleccionado: any = null;
  horaSeleccionada: any = null;
  tarjetaExpandidaIndex: number | null = null;

  // Modales
  modalAbierto: boolean = false;
  modalFechaHoraAbierto: boolean = false;

  // Fecha y hora personalizada
  fechaYHoraCompleta: string = '';

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.salonId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarSalon();
  }

  cargarSalon(): void {
    this.salonService.getSalonById(this.salonId).subscribe({
      next: (data) => (this.salon = data),
      error: (err) => {
        console.error('Error al cargar la peluquería:', err);
        this.notificationService.showError('Error al cargar la peluquería.');
      },
    });
  }

  abrirCalendarioExtendido(): void {
    this.modalAbierto = true;
  }

  cerrarCalendarioExtendido(): void {
    this.modalAbierto = false;
  }

  abrirSelectorFechaCompleto(): void {
    this.modalFechaHoraAbierto = true;
  }

  cerrarSelectorFechaCompleto(): void {
    this.modalFechaHoraAbierto = false;
  }

  confirmarFechaHora(): void {
    if (!this.fechaYHoraCompleta) {
      this.notificationService.showWarning(
        'Selecciona una fecha y hora válida.'
      );
      return;
    }

    this.fechaSeleccionada = this.fechaYHoraCompleta;
    this.horaSeleccionada = { hora: this.fechaYHoraCompleta, reservado: false };

    this.notificationService.showSuccess(
      `Has reservado para el ${this.fechaYHoraCompleta}.`
    );
    this.modalFechaHoraAbierto = false;
  }

  seleccionarDia(index: number): void {
    this.tarjetaExpandidaIndex =
      this.tarjetaExpandidaIndex === index ? null : index;
  }

  seleccionarHora(dia: any, hora: any): void {
    if (hora.reservado) {
      this.notificationService.showError('Esta hora ya está reservada.');
      return;
    }

    this.diaSeleccionado = dia;
    this.horaSeleccionada = hora;

    const fechaStr = `${dia.dia} ${dia.mes}`;
    this.fechaSeleccionada = fechaStr;

    this.notificationService.showSuccess(
      `Has reservado para el ${fechaStr} a las ${hora.hora}.`
    );
    this.modalAbierto = false;
  }

  solicitarCita(): void {
    if (!this.fechaSeleccionada || !this.peluqueroSeleccionado) {
      this.notificationService.showWarning(
        'Por favor, completa todos los campos.'
      );
      return;
    }

    console.log('CITA:', {
      salonId: this.salonId,
      fecha: this.fechaSeleccionada,
      peluquero: this.peluqueroSeleccionado,
      detalle: this.detalleCita,
      hora: this.horaSeleccionada?.hora || 'sin hora',
    });

    this.notificationService.showSuccess('Cita solicitada con éxito.');
  }
}
