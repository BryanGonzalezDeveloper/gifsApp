import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string="PO6IdIKiqnhJoFL2xFqHRtn1P0xYZmaI";
  private servicioUrl:string="https://api.giphy.com/v1/gifs";
  private _historial:string[]=[];
  public resultados:Gif[]=[];

  get historial():string[]{
    return [...this._historial];
  }

  constructor(private http:HttpClient){

      this._historial=JSON.parse(localStorage.getItem("historial")!)||[];
      this.resultados=JSON.parse(localStorage.getItem("resultados")!)||[];

        //localStorage.removeItem("resultados")

  }


  BuscarGifs(query:string){
    query=query.trim().toLowerCase();
    //Validar el ingreso de duplicados
    if(this._historial.includes(query)){
      this._historial.splice(this._historial.indexOf(query),1);
    }
    this._historial.unshift(query);

    const params=new HttpParams().set("api_key",this.apiKey)
      .set("limit","10")
      .set("q",query);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe(resp=>{
      this.resultados=resp.data;
      localStorage.setItem("resultados",JSON.stringify(this.resultados));
    });

    //Valida que si existen mas de 10 elementos en el historial solo conserve los ultimos 10
    if(this._historial.length>10)
      this._historial=this._historial.splice(0,10);
      localStorage.setItem("historial",JSON.stringify(this._historial));


  }
}
