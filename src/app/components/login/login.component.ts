import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CoreService } from '../../services/core.service';
import { User } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this._fb.group({
    user: ['', [Validators.required, Validators.email]],
    password:['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _authServ: AuthService,
    private _router : Router,
    private _coreService : CoreService
    
  ) {  }

  get user() {
    return this.loginForm.controls['user'];
  }
  
  get password() { return this.loginForm.controls['password']; }


  loginUser() {
    const { user, password } = this.loginForm.value;
    this._authServ.getUserByEmail(user as string).subscribe(
      response => {
        if (response.length > 0 && response[0].password === password) {
          sessionStorage.setItem('user', user as string);
          sessionStorage.setItem('idUser', response[0].id);
          //console.table(response);
          
          this._router.navigate(['/home']);
        } else {
          this._coreService.openSnackBar('User not found', 'Ok');  
        }
      },
      error => {
        this._coreService.openSnackBar('User not found', 'Ok');
      }

    )
  }

}
