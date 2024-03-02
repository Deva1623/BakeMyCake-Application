import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'models/order';

@Injectable({
  providedIn: 'root'
})
export class AdminordersService {
  private url =  'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<any[]>(`${this.url}/orders`);
  }

  markAsProcessed(orderId: number): Observable <Order> {
    return this.http.patch<Order>(`${this.url}/orders/${orderId}` , {processed: true});
  }
}






























 // deleteOrder(orderId: number): Observable<Order>{
  //   return this.http.delete<Order>(`${this.url}/orders/${orderId}`);
  // }