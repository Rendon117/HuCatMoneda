import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatButtonModule} from'@angular/material/button';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'VentureSoft';

  constructor(private router: Router){}

  listar(){
    this.router.navigate(['listar']);
  }

  guardar(){
    this.router.navigate(['guardar']);
  }

 
}
