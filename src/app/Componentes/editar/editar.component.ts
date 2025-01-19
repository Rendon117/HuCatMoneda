import { Component, OnInit } from '@angular/core';
import { HucatMoneda } from '../../Entidad/HuCatMoneda';
import { Router } from '@angular/router';
import { WsService } from '../../Service/ws.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';


import {MatButtonModule} from'@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar',
  imports: [FormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,NgIf],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  moneda: HucatMoneda = new HucatMoneda();

  constructor(private router: Router, private service: WsService) {}

  ngOnInit(): void {
    this.buscar(); 
  }

  buscar() {
    const numCia = Number(localStorage.getItem('numCia'));
  
    if (!numCia || numCia <= 0) {
      Swal.fire({
        title: 'Error de Validación',
        text: 'El número de Cía no es válido.',
        icon: 'warning',
      });
      return; // Si el numCia no es válido, no se realiza la búsqueda
    }
  
    this.service.buscarM(numCia).subscribe(
      (data) => {
        this.moneda = data; // Asigna los datos recibidos 
        Swal.fire({
          title: 'Éxito',
          text: `Moneda con ID ${numCia} cargada exitosamente.`,
          icon: 'success',
          timer: 1500,
        });
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          Swal.fire({
            title: 'Error',
            text: 'La Moneda que intentas buscar no existe.',
            icon: 'error',
          }).then(() => {
            this.router.navigate(['listar']);
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error inesperado al buscar la Moneda.',
            icon: 'error',
          });
        }
      }
    );
  }
  
  editar() {
    if (!this.moneda || !this.moneda.numCia) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado una moneda válida para editar.',
        icon: 'error',
      });
      return;
    }
  
    this.service.editarM(this.moneda).subscribe(
      (data) => {
        Swal.fire({
          title: 'Éxito',
          text: 'La moneda ha sido editada exitosamente.',
          icon: 'success',
          timer: 2000,
        }).then(() => {
          this.router.navigate(['listar']); // Redirige a la lista
        });
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          Swal.fire({
            title: 'Error',
            text: 'La moneda que intentas editar no existe.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al editar la moneda. Verifica los datos ingresados.',
            icon: 'error',
          });
        }
      }
    );
  }
  
  cancelar() {
    this.router.navigate(['listar']);
  }
}
