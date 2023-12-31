import { Component, SecurityContext } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { count, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrl: './pokemon-data.component.css',
  standalone: true,
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatDialogActions,
    MatCardModule, CommonModule, MatExpansionModule],
})
export class PokemonDataComponent {
  panelOpenState = false;

  public pokeImg!: SafeResourceUrl;
  public img!: string;
  public contentObj: any = [
  ];



  constructor(
    private readonly sanitizer: DomSanitizer,
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<PokemonDataComponent>
  ) {
    this.getPokeData();

  }

  transform(html: any): string {
    return this.sanitizer.bypassSecurityTrustHtml(html) as string;
  }

  get pId() {
    return sessionStorage.getItem('pId');
  }

  get pURL() {
    return sessionStorage.getItem('pURL');
  }

  urlImage(urlImage: string) {
    //return this.sanitizer.bypassSecurityTrustResourceUrl(urlImage); 
  return   this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustHtml(urlImage));
  }

  getPokeData() {
    this._coreService.getPokeDataByURL(this.pURL!)
    .subscribe({
      next: (res) => {
        if (res != null) {
          //this.pokemonDataForm.setValue(res);

          let types: string[] = [];
          let type = "";

          let moves: string[] = [];
          let move = "";

          let abilities: string[] = [];
          let ability = "";

          let stats: string[] = [];
          let stat = "";

          let games: string[] = [];
          let game = "";

          let sprites: string[] = [];
          let sprite = "";

          this.pokeImg = res.sprites.front_default;
          
          types = res.types;
          
          types.forEach((slot?: any) => {
            type+= slot.type.name.toString()+'/';
          });

          moves = res.moves;
          
          moves.forEach((slot?: any) => {
            move+= slot.move.name.toString()+'/ ';
          });

          abilities = res.abilities;
          
          abilities.forEach((slot?: any) => {
            ability+= slot.ability.name.toString()+'/ ';
          });

          stats = res.stats;
          
          stats.forEach((slot?: any) => {
            stat+= slot.base_stat.toString() + ' ' + slot.stat.name.toString()+'/ ';
          });

          games = res.game_indices;
          
          games.forEach((slot?: any) => {
            game+= slot.version.name.toString()+'/ ';
          });

          this.contentObj.id = res.id;
          this.contentObj.name = res.name;
          this.contentObj.type = type.substring(0, type.length-1);
          this.contentObj.height = res.height;
          this.contentObj.weight = res.weight;
          this.contentObj.moves = move.substring(0, move.length-2);
          this.contentObj.abilities = ability.substring(0, ability.length-2);
          this.contentObj.stats = stat.substring(0, stat.length-2);
          this.contentObj.games = game.substring(0, game.length-2);
          this.contentObj.sprite = this.pokeImg;
          //this.contentObj.length = count(this.contentObj);

          console.table(this.contentObj);
          // console.log(this.pokeImg);
          // console.log(res.sprites.front_default);
        } else {
          this._coreService.openSnackBar('Pokemon not found!', 'Ok');
        }

      },
      error: console.log,
    });
  }

  close() {
    this._dialogRef.close();
  }
}


