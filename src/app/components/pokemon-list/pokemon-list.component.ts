import { Component, Inject, Injectable, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { favUserPok, pokeList, User } from '../../interfaces/auth';
import { CoreService } from '../../services/core.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PokemonDataComponent } from '../pokemon-data/pokemon-data.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css',
  standalone: true,
  imports: [
    MatTableModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatDialogActions, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatTabsModule
    ]
})
export class PokemonListComponent {
  pokemonListForm = this._fb.group({
    index: [''],
    name: [''],
    url: [''],
    action: ['']
  });

  displayedColumns: string[] = [
    'name',
    'url'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<pokeList>;
  dataSourceF!: MatTableDataSource<favUserPok>;

  constructor(
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<PokemonListComponent>,
    private _dialog: MatDialog
  ) {
    this.getPokeList();
    this.getFavPokeList();
  }

  get idUser(): number {
    return sessionStorage['idUser'];
  }

  getPokeList() {
    this._coreService.getPokeData().subscribe({
      next: (res) => {
        if (res.results.length > 0) {
          this.dataSource = new MatTableDataSource(res.results);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //console.table(res.results)
        } else {
          this._coreService.openSnackBar('No Pokemons found!', 'Ok');
        }
      },
      error: console.log,
    });
  }

  getFavPokeList() {    
    this._coreService.getFavUserPList(this.idUser).subscribe({
      next: (resp) => {
        if (resp.length > 0) {          
          // this.dataSourceF = new MatTableDataSource(res.results);
          // this.dataSourceF.sort = this.sort;
          // this.dataSourceF.paginator = this.paginator;
          // //console.table(res.results)
        } else {
          this._coreService.openSnackBar('No Pokemons found!', 'Ok');
        }
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterF(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceF.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceF.paginator) {
      this.dataSourceF.paginator.firstPage();
    }
  }

  openPokemonData(url: string) {

    const dialogConfig = new MatDialogConfig();

    var id = url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","")

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 

    sessionStorage.setItem('pId', id);
    
    sessionStorage.setItem('pURL', url);

    this._dialog.open(PokemonDataComponent, dialogConfig);
  }

  favPokemon(url: string){

    var idPokem = parseInt(url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/",""));

    var postData = {idUser:this.idUser, idPokem};

    this._coreService.registerFavUserP(postData).subscribe(
      response => {
       //console.log(response);
       this._coreService.openSnackBar('Fav!', 'Ok');

     },
     error => {
     }
   )
  }

  close() {
    this._dialogRef.close();
  }
}
