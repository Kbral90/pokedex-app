import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { UserListComponent } from '../user-list/user-list.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatCardModule, MatMenuModule]
})
export class HomeComponent {
  logOutForm = this._fb.group({
    user: ['']
  });
  usersForm = this._fb.group({});

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _coreService: CoreService,
    private _dialog : MatDialog
  ) {    
  }

  openUserListD(){    

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this._dialog.open(UserListComponent, dialogConfig);
  }  

  openPokemonListD(){    

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this._dialog.open(PokemonListComponent, dialogConfig);
  }  

  logOut() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}