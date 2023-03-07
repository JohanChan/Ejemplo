import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  url = "https://pokeapi.co/api/v2/pokemon";

  obtenerPokemon(nombre: String): Observable<any> {
    var fullpath = `${this.url}/${nombre}`;
    return this.http.get(fullpath);
  }
}
