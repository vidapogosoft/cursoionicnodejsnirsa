import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class CharacterDetailPage implements OnInit {

  characterId: string = '';
  character = null as any;

  constructor(
    private actRoute: ActivatedRoute, private rickandmortySVC: RestService
  ) { 

      this.characterId = this.actRoute.snapshot.paramMap.get("id") as string;
      console.log(this.characterId);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getCharacter();
  }

  getCharacter()
  {
    this.rickandmortySVC.getCharacterById(this.characterId).subscribe({

      next:(res: any) => {
          console.log(res);
          this.character = res;
      },
      error: (error: any) =>{
        console.error(error);
      }
    });
  }

}
