import { Component, Inject, Injectable, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/auth';
import { CoreService } from '../../services/core.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDataComponent } from '../user-data/user-data.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  imports: [
    MatTableModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatDialogActions, MatButtonModule, MatIconModule]
})

export class UserListComponent {
  userListForm = this._fb.group({
    user: [''],
    password: [''],
    nombre: [''],
    apellidos: [''],
    dob: [''],
    equipo: [''],
    action: ['']
  })

  displayedColumns: string[] = [
    'id',
    'user',
    'nombre',
    'apellidos',
    'dob',
    'equipo',
    'action'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<User>;

  constructor(
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<UserListComponent>,
    private _dialog: MatDialog
  ) {
    this.getUserList();
  }

  getUserList() {
    this._coreService.getUserList().subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this._coreService.openSnackBar('No Users found!', 'Ok');
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

  close() {
    this._dialogRef.close();
  }

  openUserEdit(id: number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    sessionStorage.setItem('idU', id.toString())

    this._dialog.open(UserDataComponent, dialogConfig).afterClosed().subscribe(()=> this.getUserList());
  }

  deleteUser(id: number) {
    this._coreService.deleteUser(id).subscribe({
      next: (res) => {
          this._coreService.openSnackBar('User deleted!', 'Ok');
          this.getUserList();
      },
      error: console.log,
    });
  }
}
