import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserPok, pokeData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private listDataURL= 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';
  private dataUrl = 'http://localhost:3000';
  private userUrl = 'http://localhost:3000/users/';
  private offset = 50;

  constructor(
    private _snackBar: MatSnackBar,
    private _http: HttpClient
  ) { }

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  getUserList(): Observable<any> {
    return this._http.get(`${this.userUrl}`);
  }

  getUserData(id: number): Observable<any> {
    return this._http.get(`${this.userUrl}${id}`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this._http.put(`${this.userUrl}${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`${this.userUrl}${id}`);
  }

  getFavUserPList(idUser: number): Observable<any> {
    return this._http.get(`${this.dataUrl}/favUserPokemon/?idUser=${idUser}`);
  }

  registerFavUserP(favUserPDetails: UserPok): Observable<any> {
    return this._http.post(`${this.dataUrl}/favUserPokemon`, favUserPDetails);
  }

  getPokeData(): Observable<any> {
    return this._http.get(`${this.listDataURL}`);
  }

  getPokeDataById(id: string): Observable<any> {
    return this._http.get(`${this.listDataURL}/${id}`);
  }

  getPokeDataByName(name: string): Observable<any> {
    return this._http.get(`${this.listDataURL}/${name}`);
  }

  getPokeDataByURL(url: string): Observable<any> {
    return this._http.get(`${url}`);
  }
}
