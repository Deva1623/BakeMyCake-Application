import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FeedbackService } from 'services/feedback.service';
import { Feedback } from 'models/feedback';
import { AuthService } from 'services/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  selectedSentiment: string;
  suggestion: string;
  feedback: Feedback;
  url = 'http://localhost:3000/feedbacks';
  constructor( private snackbar : MatSnackBar , private feedbackService: FeedbackService , private authService: AuthService) {}

  selectSentiment(sentiment: string) {
    this.selectedSentiment = sentiment;
    this.suggestion
  }

  

  submit(): void {

 this. feedback =  {
  "sentiment":this.selectedSentiment,
  "suggestion": this.suggestion,
  "email": this.authService.getUser().email,
  "username": this.authService.getUser().firstName      
  }
    
    
    this.feedbackService.submitFeedback(this.feedback).subscribe(
      (response) => {
        console.log(response);
        
        const msg = this.getFeedbackMessage(this.selectedSentiment);
        if(this.authService.isLoggedIn()){
         
        this.snackbar.open(msg , 'OK' , {duration:7000});

        // this.snackbar.open('Feedback successfully submitted', 'OK', { duration: 3000 });
        }else{
          this.snackbar.open('To submit feedback you have to login first' , 'OK' , {duration:3000});
        }
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        this.snackbar.open('Error submitting feedback', 'OK', { duration: 3000 });
      }
    );
  }
 //-----------------------------------------------------------------------------------------
 getFeedbackMessage(sentiment: string): string {
  switch (sentiment) {
    case 'very dissatisfied':
      return "We're sorry to hear that you're very dissatisfied. We will work to improve. Thanks for sharing your feedback.";
    case 'dissatisfied':
      return "We understand your dissatisfaction. We'll strive to do better in the future. Thanks for your feedback.";
    case 'neutral':
      return "Thank you for your feedback. We'll take it into account to make improvements.";
    case 'good':
      return "We're glad you're happy! Your positive feedback motivates us to continue providing great service.";
    case 'Excellent':
      return "Wow, that's excellent! We're thrilled to have made your experience great. Thank you for your feedback.";
    default:
      return "Thanks for your feedback.";
  }
} 


}

