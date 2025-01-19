import { Routes } from '@angular/router';
import { ListarComponent } from './Componentes/listar/listar.component';
import { GuardarComponent } from './Componentes/guardar/guardar.component';
import { EditarComponent } from './Componentes/editar/editar.component';


export const routes: Routes = [

   

    {
        path: 'listar',
        component: ListarComponent
    },
    {
        path: 'guardar',
        component: GuardarComponent
    },
    {
        path: 'editar',
        component: EditarComponent
    }
];
