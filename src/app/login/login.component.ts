import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }
  logIn(){
    this.http.get<any>("http://localhost:3000/signupUser/")
    .subscribe({
      next: (res)=>{
        const user = res.find((a: any)=>{
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        })
        if(user){
          alert("Login success");
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
        }else{
          alert("user not found")
        }
      },
      error: ()=>{
        alert("Something went wrong")
      }
    })
  }

}
