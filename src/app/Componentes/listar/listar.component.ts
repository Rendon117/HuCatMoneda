import { Component, OnInit } from '@angular/core';
import { HucatMoneda } from '../../Entidad/HuCatMoneda';
import { WsService } from '../../Service/ws.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import Swal from 'sweetalert2';
import {MatButtonModule} from'@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  imports: [MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, FormsModule,CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit{
  monedas: HucatMoneda[] = [];

  numCia: number | null = null;
  parametros: any = {
    claveMoneda: '',
    descripcion: '',
    simbolo: '',
    abreviacion: '',
    monedaCorriente: '',
    status: ''
  };

  constructor(private router: Router, private service: WsService){}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listarMonedas().subscribe(data => {
      console.log(JSON.stringify(data));
      this.monedas = data;
  
      // Validación para mostrar alerta si no hay registros
      if (this.monedas.length === 0) {
        Swal.fire({
          title: 'No se encontraron registros',
          text: 'No hay monedas disponibles.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  displayedColumns: string[] = ['numCia', 'claveMoneda', 'descripcion', 'simbolo','abreviacion','monedaCorriente', 'status','editar','eliminar'];

  guardar(){
    this.router.navigate(['guardar']);
  }

  buscarPorNumCia() {
    // Verifica que numCia no sea null y que sea un número válido
    if (this.numCia === null || isNaN(this.numCia)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese un número de Cia válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      // Si numCia es válido, realiza la búsqueda
      this.service.buscarM(this.numCia).subscribe(
        data => {
          this.monedas = [data];
        },
        error => {
          console.error('Moneda no encontrada', error);
          Swal.fire({
            title: 'Error',
            text: 'La moneda no se encontró.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }

  buscarPorParametros() {
    if (!this.parametros || Object.values(this.parametros).every(param => param === null || param === '')) {
      Swal.fire({
        title: 'Error',
        text: 'Debes proporcionar al menos un parámetro para realizar la búsqueda.',
        icon: 'warning',
      });
      return;
    }
  
    this.service.buscarPor(this.parametros).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.monedas = data; // Asigna las monedas encontradas
          Swal.fire({
            title: 'Éxito',
            text: `Se encontraron ${data.length} monedas que coinciden con los parámetros ingresados.`,
            icon: 'success',
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: 'Sin resultados',
            text: 'No se encontraron monedas que coincidan con los parámetros ingresados.',
            icon: 'info',
          });
        }
      },
      (error) => {
        console.error('Error al buscar monedas por parámetros', error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error inesperado al buscar monedas. Por favor, intenta nuevamente.',
          icon: 'error',
        });
      }
    );
  }
  

  editar(numCia: number) {
    // Almacena el ID en localStorage
    localStorage.setItem('numCia', numCia.toString());
    // Navega al componente de edición
    this.router.navigate(['editar']);
  }


  eliminar(numCia: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡La Moneda será eliminada permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarM(numCia).subscribe(
          () => {
            Swal.fire('Eliminado!', 'La Moneda ha sido eliminada.', 'success');
            this.listar();  
          },
          (error) => {
            Swal.fire('Error', 'Ocurrió un error al eliminar la Moneda.', 'error');
          }
        );
      }
    });
  }

}
