import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../interfaces/auth';
import { CoreService } from '../../services/core.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  editUForm = this._fb.group({
    id: [''],
    user: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    dob: ['', Validators.required],
    equipo: ['', Validators.required]
  })

  equipo: string[] = [
    'Rojo',
    'Azul',
    'Amarillo',
  ];

  constructor(
    private _fb: FormBuilder,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<UserDataComponent>
  ) {
    this.getUserData();
  }

  get idU() {
    return sessionStorage.getItem('idU');
  }

  get user() {
    return this.editUForm.controls['user'];
  }

  get password() {
    return this.editUForm.controls['password'];
  }

  get nombre() {
    return this.editUForm.controls['nombre'];
  }

  get apellidos() {
    return this.editUForm.controls['apellidos'];
  }

  get dob() {
    return this.editUForm.controls['dob'];
  }

  getUserData() {
    this._coreService.getUserData(parseInt(this.idU!)).subscribe({
      next: (res) => {
        if(res != null){
          this.editUForm.setValue(res);
        } else{
          this._coreService.openSnackBar('User not found!', 'Ok');
        }
        
      },
      error: console.log,
    });
  }

  editUSubmit() {
    const postData = { ...this.editUForm.value };
    this._coreService.updateUser(parseInt(this.idU!.toString()), postData as User).subscribe(
      response => {
        console.log(response);
        this._coreService.openSnackBar('User edited!', 'Ok');        
        this._dialogRef.close();

        this._coreService.getUserList
      },
      error => {
        this._coreService.openSnackBar('User not edited!', 'Ok');
      }
    )
  }

  close() {
    this._dialogRef.close();
  }
}

