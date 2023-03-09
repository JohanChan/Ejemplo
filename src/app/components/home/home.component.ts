import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name = "";
  nameapi = "";
  imagen = "./assets/defaultpk.png";
  imagen2 = "./assets/defaultpk.png";
  imagen3 = "./assets/defaultpk.png";
  imagen4 = "./assets/defaultpk.png";
  exp = "";
  type = "";
  stats = "";
  show = false;
  score = 0;
  init = true;
  tries = 0;

  constructor(private homeservice: HomeService) { }

  ngOnInit(): void {

    if(this.init){
      this.datosPokemon();
    }
    
  }

  datosPokemon() {
    try {

      this.imagen = "./assets/defaultpk.png";
      this.exp = "";
      this.type = "";
      this.stats = "";

      let random = Math.floor(Math.random()*1000) + 1;
      if(this.init){
        this.init = false;
      }

      this.homeservice.obtenerPokemon(random.toString()).subscribe((res: any) => {
        
        if(res.sprites.other.dream_world.front_default != null && res.sprites.other.dream_world.front_default != undefined){
          this.imagen = res.sprites.other.dream_world.front_default;
          // this.imagen2 = res.sprites.back_default;
          // this.imagen3 = res.sprites.front_shiny;
          // this.imagen4 = res.sprites.back_shiny;
          this.nameapi = res.forms[0].name;
          this.type = res.types[0].type.name;
          // this.exp = res.base_experience;
          // for (let index = 0; index < res.stats.length; index++) {
          //   this.stats += res.stats[index].stat.name + ", ";
          // }
        }else{
          this.datosPokemon();
        }


      })
    } catch (error) {
      console.log("Not found")
    }

  }

  mathchpk(){

    this.tries ++;
    if(this.nameapi.toLocaleLowerCase() === this.name.toLocaleLowerCase()){
      this.score +=10;
    }
    
    this.name = "";

    if(this.tries >= 10){
      Swal.fire({
        title: 'Puntaje: '+this.score,
        confirmButtonText: 'Iniciar de nuevo',
        allowOutsideClick: false
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.datosPokemon();
          this.score = 0;
        } 
      })
    }else{
      this.datosPokemon();
    }

  }

  end(){
    Swal.fire({
      title: 'Puntaje: '+this.score,
      confirmButtonText: 'Iniciar de nuevo',
      allowOutsideClick: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.datosPokemon();
        this.score = 0;
      } 
    })
  }

}
