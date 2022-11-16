import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public  hide = true;
  public signupForm : FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: [''],
      mobile: [''],
      email: [''],
      password: ['']
    })
  }
  signUp(){
    this.http.post<any>("http://localhost:3000/signupUser/",this.signupForm.value)
    .subscribe({
      next: (res)=>{
        alert("Signup successfull")
        this.signupForm.reset()
        this.router.navigate(['login'])
      },
      error: ()=>{
        alert("Something went wrong")
      }
    })
  }

}
