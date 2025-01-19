import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HucatMoneda } from '../Entidad/HuCatMoneda';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8081/api/monedas";

  //LISTAR TIENDA
  listarMonedas(){
    return this.http.get<HucatMoneda[]>(this.url + "/listar");
  }

  //GUARDAR MONEDA
guardarM(moneda: HucatMoneda){
  return this.http.post<HucatMoneda>(this.url + "/guardar",moneda);
}

//BUSCAR MONEDA
buscarM(numCia: number) {
  return this.http.get<HucatMoneda>(`${this.url}/${numCia}`);
}

//BUSCAR POR PARAMETROS
buscarPor(parametros: any){
  const params: any = {};
  Object.keys(parametros).forEach(key => {
    if (parametros[key]) {
      params[key] = parametros[key];
    }
  });
  return this.http.get<HucatMoneda[]>(this.url + "/buscar", { params });
}
//EDITAR MONEDA
editarM(moneda: HucatMoneda){
  return this.http.put<HucatMoneda>(`${this.url}/${moneda.numCia}`, moneda);
  }


  //ELIMINAR MONEDA
eliminarM(numCia: number){
  return this.http.delete<void>(`${this.url}/${numCia}`);
}
}
