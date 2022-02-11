import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elcamino-back';
  screenWidth = window.innerWidth

  constructor(public dataService:DataService){
    console.log(this.screenWidth);
    window.addEventListener('resize', ()=>{
      this.screenWidth = window.innerWidth      
    })

  }

}
