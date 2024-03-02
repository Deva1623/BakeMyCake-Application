import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Feedback } from 'models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  url = 'http://localhost:3000/feedbacks';  
  
  constructor(private http: HttpClient) { }

  submitFeedback(feedback: any) : Observable<any>{
    return this.http.post<any>(this.url , feedback)
  }
}
