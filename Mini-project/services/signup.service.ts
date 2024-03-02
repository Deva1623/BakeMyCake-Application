import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Credential } from 'models/userdata';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  Url = 'http://localhost:3000/credentials';
  constructor(private http: HttpClient) { }

  addUser(userData: Credential): Observable<Credential> {
    return this.http.post<Credential>(this.Url , userData)
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<Credential[]>(this.Url).pipe(   //to chain these fetching and mapping operations pipe used
      map((credentials: Credential[]) => {
        return credentials.some((cred) => cred.email === email);
      })
    );
  }
}
