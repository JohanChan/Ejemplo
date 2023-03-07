import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = "";
  imagen = "./assets/defaultpk.png";
  imagen2 = "./assets/defaultpk.png";
  imagen3 = "./assets/defaultpk.png";
  imagen4 = "./assets/defaultpk.png";
  exp = "";
  nombrePok = "";
  type = "";
  stats = "";

  constructor(private homeservice: HomeService) { }

  ngOnInit(): void {
  }

  datosPokemon() {
    try {

      this.imagen = "./assets/defaultpk.png";
      this.imagen2 = "./assets/defaultpk.png";
      this.imagen3 = "./assets/defaultpk.png";
      this.imagen4 = "./assets/defaultpk.png";
      this.exp = "";
      this.nombrePok = "";
      this.type = "";
      this.stats = "";


      this.homeservice.obtenerPokemon(this.name).subscribe((res: any) => {
        console.log(res);
        
        this.imagen = res.sprites.front_default;
        this.imagen2 = res.sprites.back_default;
        this.imagen3 = res.sprites.front_shiny;
        this.imagen4 = res.sprites.back_shiny;
        this.nombrePok = res.forms[0].name;
        this.type = res.types[0].type.name;
        this.exp = res.base_experience;
        for (let index = 0; index < res.stats.length; index++) {
          this.stats += res.stats[index].stat.name + ", ";

        }

      })
    } catch (error) {
      console.log("Not found")
    }

  }

}
