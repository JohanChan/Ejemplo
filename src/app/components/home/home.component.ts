import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = "";
  imagen = "";
  nombrePok = ""
  constructor(private homeservice: HomeService) { }

  ngOnInit(): void {
  }

  datosPokemon(){
    this.homeservice.obtenerPokemon(this.name).subscribe((res:any)=>{
      console.log(res)
      this.imagen = res.sprites.front_default;
      this.nombrePok = res.forms[0].name;
    })
  }

}
