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


@Component({
  selector: 'app-guardar',
  imports: [FormsModule, MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,],
  templateUrl: './guardar.component.html',
  styleUrl: './guardar.component.css'
})
export class GuardarComponent{


  moneda: HucatMoneda = new HucatMoneda();

  constructor(private router: Router, private service: WsService) { }

 
  guardar() {
    // Validación previa antes de llamar al servicio
    if (!this.moneda.claveMoneda || !this.moneda.descripcion || !this.moneda.simbolo || !this.moneda.abreviacion || !this.moneda.monedaCorriente || !this.moneda.status) {
      Swal.fire({
        title: "Error de validación",
        text: "Todos los campos son obligatorios.",
        icon: "warning",
        confirmButtonText: "Aceptar"
      });
      return; // Si falta algún campo, no se hace la llamada al servicio
    }
  
    this.service.guardarM(this.moneda).subscribe(data => {
      console.log(JSON.stringify(data));
      Swal.fire({
        title: "GUARDADO",
        text: "La moneda se guardó correctamente.",
        icon: "success"
      }).then(() => {
        this.router.navigate(['listar']);
      });
      
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        title: "¡Error al guardar!",
        text: JSON.stringify(error.error.Mensaje),
        icon: "error"
      });
    });
  }
  
  cancelar() {
    this.router.navigate(['listar']);
  }
}
