import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SalonService } from '../../services/salon.service';

@Component({
  selector: 'app-salon',
  imports: [ReactiveFormsModule],
  templateUrl: './salon.component.html',
  styleUrl: './salon.component.scss'
})
export class SalonComponent implements OnInit {
  salonForm: FormGroup;
  salon: any = null;

  constructor(private salonService: SalonService) {
    this.salonForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      openingHours: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadSalon();
  }

  loadSalon(): void {
    this.salonService.getMySalon().subscribe({
      next: (data) => {
        this.salon = data;
        this.salonForm.patchValue(data); // Cargar datos existentes en el formulario
      },
      error: (error) => {
        console.error('Error al cargar el salón:', error);
      },
    });
  }

  saveSalon(): void {
    if (this.salonForm.valid) {
      const { name, location, openingHours } = this.salonForm.value;
      if (this.salon) {
        // Actualizar el salón existente
        this.salonService.updateSalon(this.salon.id, name, location, openingHours).subscribe({
          next: () => {
            alert('Salón actualizado correctamente.');
          },
          error: (error) => {
            console.error('Error al actualizar el salón:', error);
            alert('Error al actualizar el salón.');
          },
        });
      } else {
        // Crear un nuevo salón
        this.salonService.createSalon(name, location, openingHours).subscribe({
          next: () => {
            alert('Salón registrado correctamente.');
            this.loadSalon(); // Recargar los datos
          },
          error: (error) => {
            console.error('Error al registrar el salón:', error);
            alert('Error al registrar el salón.');
          },
        });
      }
    }
  }
}