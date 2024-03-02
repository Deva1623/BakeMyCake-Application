import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Item } from 'models/data';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  
  url = 'http://localhost:3000/data';
  getImages(): Observable<Item[]> {
    return this.http.get<Item[]>(this.url);
  }
 
}
