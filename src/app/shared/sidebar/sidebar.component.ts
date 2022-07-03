import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent{

  constructor(private gifsService:GifsService) { }//Inyeccion de dependencia para gifs.service.ts

  get historial():string[]{
    return this.gifsService.historial;
  }

  CargarBusqueda(termino:string){
    this.gifsService.BuscarGifs(termino);
  }

}
