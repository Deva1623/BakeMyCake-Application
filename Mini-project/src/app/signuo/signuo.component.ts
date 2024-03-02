import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Credential } from 'models/userdata';
import { SignupService } from 'services/signup.service';

@Component({
  selector: 'app-signuo',
  templateUrl: './signuo.component.html',
  styleUrls: ['./signuo.component.css']
})
export class SignuoComponent {
   
  cities: string[] = [  "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Rewa", "Sagar", "Satna",
  "Katni", "Singrauli","Neemuch", "Khandwa", "Vidisha", "Hoshangabad", "Balaghat", "Sehore", "Harda",
  "Ashoknagar", "Datia", "Damoh", "Mhow", "Khargone", "Dhar", "Rajgarh", 
  "Sironj", "Chhatarpur", "Tikamgarh", "Bhind", "Guna"];

  states: string[] = ["Maharashtra", "Uttar Pradesh","Madhya Pradesh", "Tamil Nadu", "Karnataka", "Andhra Pradesh",
  "Kerala", "Gujarat", "Rajasthan", "Punjab", "Haryana"]

  
//----------------------------------------
  isdataSubmitted: boolean = false;
  imgURl = './assets/signup.png';
  registerForm: FormGroup =  this.formBuilder.group({
    id: [0],
    firstName: ['',[Validators.required,Validators.minLength(2)]],
    lastName: ['',[this.LastNameValidator]],
    password: ['',[Validators.required,this.passwordValidator, ,this.passLength]],
    confirmPassword: ['',[Validators.required, this.passMatcher]],
    gender: [''],
    age: [0,[Validators.min(18), this.ageValidator]],
    email: ['',[Validators.required,this.emailValidator]],
    phone:['',[Validators.required ,Validators.maxLength(10) , Validators.pattern(/^[6-9]\d{9}$/) ]],
    address: this.formBuilder.group({
      street: ['' ,[Validators.required]],
      city: ['' ,[Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['',[Validators.required, Validators.pattern('^[0-9]{6}$') ]]
    }),
  });

  //-------------------------------------------------------------------------------------------------------
  userData: Credential;
  //------------------------------

  hide = true;
  constructor(private formBuilder: FormBuilder ,private signupService: SignupService, private _snackbar: MatSnackBar) {}
  //----------------------------------------------
  ngOnInit(): void {}
  //-------------------------------age vaidation-------------------------------------------------------------
  ageValidator(control: AbstractControl){
    if(control.value < 18){
      return {invalidAge: true}
    }
    return null;
  }
  //----------------------------password validation-----------------------------------------------------------
  passwordValidator(control: AbstractControl){ //abstract control represents reprresenting 1 formcontrol
    const passEntered = control.value;
    //-------------------------
    const symbolsCheck = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const upperCaseCheck = /[A-Z]+/;
    const lowerCaseCheck = /[a-z]+/;
    const numberCheck = /[0-9]+/;

    if(!symbolsCheck.test(passEntered) || !upperCaseCheck.test(passEntered) || !lowerCaseCheck.test(passEntered) || !numberCheck.test(passEntered) ){
      return {invalidPassword: true};
    }
    return null;
  }
  //---------------------------------
  passLength(control: AbstractControl){
    const passlength = control.value;
    if(passlength.length > 8 && passlength.length < 12){
      return {length: true };
    }
    return null
  }
  //------------------------------------------------------------------------------------------------------
  passMatcher(control: AbstractControl){
    const password = control.parent?.get('password').value;  //take pass from total form
    const confirmPassword = control?.value;                  //current fmctrl

    if(password !== confirmPassword){
      return {passwordMismatch: true}
    }
    return null;
  }
  //---------------------confirm pass validation----------------------------------------------------------------
  get  firstName(){
    return this.registerForm.get('firstName');
  }   
  get  lastName(){
    return this.registerForm.get('lastName');
  }
  get password(){
      return this.registerForm.get('password');
  } 
   get  confirmPassword(){
      return this.registerForm.get('confirmPassword');
  }
   get  email(){
    return this.registerForm.get('email');
  }
   get  age(){
    return this.registerForm.get('age');
  }
   get  phone(){
    return this.registerForm.get('phone');
  }
  //------------------
get addressFormGroup() {
  return this.registerForm.get('address') as FormGroup;
}

get streetControl() {
  return this.addressFormGroup.get('street');
}

get cityControl() {
  return this.addressFormGroup.get('city');
}

get stateControl() {
  return this.addressFormGroup.get('state');
}

get zipCodeControl() {
  return this.addressFormGroup.get('zipCode');
}

//-----------------------------------------------------------------------------------------------------------
onSubmit() {
  const email = this.registerForm.get('email')?.value;

  this.signupService.checkEmailExists(email).subscribe(
    (emailExists) => {
      if (emailExists) {
        this._snackbar.open('Email already exists. Please use a different email.', 'error', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });

      } else {

        const userData: Credential = { ...this.registerForm.value, address: { ...this.addressFormGroup.value }, role: 'user' };
        this.signupService.addUser(userData).subscribe(
          (response) => {
            this._snackbar.open('Registration Done Successfully', 'success', {
              duration: 5000,panelClass: ['mat-toolbar', 'mat-primary']
});
          },
          (error) => {
            alert('Failed to add user, the server has an issue');
            console.error(error);
          }
        );
      }
    });
  }

  canDeactivate(){
    if(!this.isdataSubmitted){
      this.isdataSubmitted = confirm("You have unsaved changes. Are you sure you want to leave?");
      return this.isdataSubmitted;
    }
    return true  //leave despite unsaved changes
  }

  //-----------------
  LastNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const lastName = control.value;
    const firstName =control.parent?.get('firstName').value;

    if(firstName === lastName){
      return {lastnameValid:true}
    }
   return null;
  }
//----------------------------
emailValidator(control: AbstractControl): {[key:string]: boolean} | null {
  if(control.value){
    const requiredPattern = /^[^0-9][a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    if(!requiredPattern.test(control.value)){
      return {invalidEmail: true}
    }
  }
  return null;
}
}









































//     (error) => {
//       console.error('Error checking email existence:', error);
//     }
//   );
// }




/*  onSubmit() {
    const email = this.registerForm.get('email')?.value;

    this.signupService.checkEmailExists(email).subscribe(
      (emailExists) => {
        if (emailExists) {
          // An account with this email already exists
          this._snackbar.open('Email already exists. Please use a different email.', 'error', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }else{

    const userData: Credential = {...this.registerForm.value,address: { ...this.addressFormGroup.value } , role: 'user'};
  
    this.signupService.addUser(userData).subscribe(
      (response) => {
        this._snackbar.open('Registration Done Successfully', 'success', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
      },
      (error) => {
        alert('Failed to add user, server has an issue');
        console.error(error);
      }
    );
  }
   */