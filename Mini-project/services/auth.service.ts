import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credential } from 'models/userdata';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn: boolean = false;                     // track user is logged in or not.
  userRole: 'user' | 'admin' | undefined;       //store the user's role 
  public loggedUser: Credential | null = null;   //stores credentials or data for the currently logged-in user

  credential: Credential[]  = [];               //initial blank arry for credential
  Url = ' http://localhost:3000/credentials'

  constructor(private http: HttpClient) {
   this.fetchUsersFromServer();
   
   this.loggedIn = localStorage.getItem('loggedIn')=== 'true';  //read and check if alredy logged in from local storage

   this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  }
  private fetchUsersFromServer() {
    this.http.get<Credential[]>(this.Url).subscribe(
      (data) => {
        this.credential = data;     //fill blank array with fetched credentails
      },
      (error) => {
        console.error('Error fetching user data from the server', error);
      }
    );
}

login( email: string, password: string): string | null {
  if(this.loggedIn){
    return 'logout not done'; //logged in alredy then u cant login again
  }

  const user = this.credential.find((user) => user.email === email && user.password === password);  
  if (user) {                     // if matching user found login is success
    this.loggedIn = true;         //logged in becomes true
    this.loggedUser = user;       //holds data aboutlogged in user
    localStorage.setItem('loggedIn' , 'true');
    localStorage.setItem('loggedUser' , JSON.stringify(user)); //storing user data as json string in loggeduser
    return null;
  }
  this.loggedIn = false;    //no match means loggin unsucess
  this.loggedUser = null;

   localStorage.removeItem('loggedIn');
   localStorage.removeItem('loggedUser');
  return 'invalid credential'; 
}
//---------------------------------------------------------------
logout() {
  this.loggedIn = false;
  this.loggedUser = null;
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loggedUser');


}

isLoggedIn(): boolean {
  return this.loggedIn;
}



//------------------------------------------------------------
getUser() : Credential | null {
  return this.loggedUser;

}

isAuthorised(): boolean{
  const user = this.getUser();
  return user ? user.role === 'admin' : false;
}

}
