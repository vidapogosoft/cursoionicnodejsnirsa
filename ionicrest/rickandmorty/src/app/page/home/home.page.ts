import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class HomePage implements OnInit {

  constructor(private rickandmortysvc: RestService) { }

  characters: any[] = [];
  params = {} as any;

  ngOnInit() {

    this.params.page = 0;
    this.getCharacters();

  }

  getCharacters( event?: any ){

    this.params.page +=1;

    this.rickandmortysvc.getCharacters(this.params).subscribe({
        next:(res: any) => {

          this.characters.push(...res.results);
          console.log(this.characters);

          if(event){
            event.target.complete();
          }

        },
        error: (error: any) => {
          console.error(error);
          if(event){
            event.target.complete();
          }
        }
    });

  }

  searchCharacters()
  {
        this.params.page = 1;

       this.rickandmortysvc.getCharacters(this.params).subscribe({
        next:(res: any) => {
          this.characters = res.results;
          console.log(this.characters);

        },
        error: (error: any) => {
          console.error(error);
        }
    });
  }

}
