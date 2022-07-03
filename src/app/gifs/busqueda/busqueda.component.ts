import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  //Realizar inyeccion de dependecia
  constructor(private gifsService:GifsService){}
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;//non-null asertion operator !
  Buscar(){
    const valor=this.txtBuscar.nativeElement.value;
    if(valor.trim().length===0)return;
    this.gifsService.BuscarGifs(valor);
    //console.log(valor);
    this.txtBuscar.nativeElement.value="";
  }
}
