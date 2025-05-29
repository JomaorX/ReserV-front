import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalonService } from '../salon/salon.services';

@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.scss']
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
      dia: '21',
      mes: 'feb',
      horas: [
        { hora: '9:00', reservado: false },
        { hora: '10:00', reservado: false }
      ]
    },
    {
      dia: '22',
      mes: 'feb',
      horas: [
        { hora: '9:00', reservado: false },
        { hora: '10:00', reservado: false }
      ]
    },
    {
      dia: '23',
      mes: 'feb',
      horas: [
        { hora: '9:00', reservado: false },
        { hora: '10:00', reservado: false }
      ]
    },
    {
      dia: '24',
      mes: 'feb',
      horas: [
        { hora: '9:00', reservado: false },
        { hora: '10:00', reservado: false }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private salonService: SalonService
  ) {}

  ngOnInit(): void {
    this.salonId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarSalon();
  }

  cargarSalon(): void {
    this.salonService.getSalonById(this.salonId).subscribe({
      next: (data) => this.salon = data,
      error: (err) => console.error('Error al cargar la peluquería:', err)
    });
  }

  solicitarCita(): void {
    if (!this.fechaSeleccionada || !this.peluqueroSeleccionado) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    console.log('CITA:', {
      salonId: this.salonId,
      fecha: this.fechaSeleccionada,
      peluquero: this.peluqueroSeleccionado,
      detalle: this.detalleCita
    });

    alert('Cita solicitada con éxito (simulado).');
  }

  seleccionarHora(dia: any, hora: any): void {
    if (hora.reservado) {
      alert('Esta hora ya está reservada.');
      return;
    }

    hora.reservado = true;

    // Actualizamos automáticamente la fechaSeleccionada para el formulario
    const fechaStr = `${dia.dia} ${dia.mes}`;
    this.fechaSeleccionada = fechaStr;

    alert(`Has reservado para el ${fechaStr} a las ${hora.hora}`);
  }
}
