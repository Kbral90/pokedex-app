import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-data',
  templateUrl: './pokemon-data.component.html',
  styleUrl: './pokemon-data.component.css'
})
export class PokemonDataComponent {
  pokemonDataForm = this._fb.group({
    index: [''],
    name: [''],
    image: [''],
    fav: ['']
  })
  
  public pokeImg!: SafeResourceUrl;
  public img!: string;

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
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+ urlImage);
  }

  getPokeData() {
    this._coreService.getPokeDataByURL(this.pURL!).subscribe({
      next: (res) => {
        if(res != null){          
          //this.pokemonDataForm.setValue(res);
          this.pokeImg = this.urlImage(res.sprites.front_default);
          console.log(this.pokeImg);
          console.log( res.sprites.front_default);

        } else{
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


