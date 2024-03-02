import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'models/data';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
   url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getItem(id?: string) : Observable<Item>{
    return this.http.get<Item>(`${this.url}/data/${id}`);
  }

  submitOrder(orderData: any): Observable<any> {
    const resource = `${this.url}/orders`;
    return this.http.post(resource, orderData);
  } 
}




















 // getItemDetail(itemId:number): Observable<Item>{
  //   const resource =`${this.url}/data/${itemId}`;
  //   return this.http.get<Item>(resource);
  // }
  // getItemDetails(itemId: string): Observable<any> {
  //   const itemUrl = `${this.url}/data/${itemId}`;
  //   return this.http.get(itemUrl);
  // }