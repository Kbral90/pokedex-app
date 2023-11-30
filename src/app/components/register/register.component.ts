import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  registerForm = this._fb.group({
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
    private _authService: AuthService,
    private _router: Router,
    private _coreService: CoreService
  ) { }

  get user() {
    return this.registerForm.controls['user'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get nombre() {
    return this.registerForm.controls['nombre'];
  }

  get apellidos() {
    return this.registerForm.controls['apellidos'];
  }

  get dob() {
    return this.registerForm.controls['dob'];
  }

  registerSubmit() {
    const { user } = this.registerForm.value;
    this._authService.getUserByEmail(user as string).subscribe(
      response => {
        if (response.length > 0) {
          this._coreService.openSnackBar('User already registered!', 'Ok');
        } else {
          const postData = { ...this.registerForm.value };
          this._authService.registerUser(postData as User).subscribe(
            response => {
              //console.log(response);
              this._coreService.openSnackBar('User registred!', 'Ok');
              this._router.navigate(['login'])
            },
            error => {
            }
          )
        }
      },
      error => {
        this._coreService.openSnackBar('User not found', 'Ok');
      }

    )
  }
}

