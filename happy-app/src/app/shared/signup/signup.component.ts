import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder } from '../../../../node_modules/@angular/forms';
import { FormGroup,Validators,FormArray,FormControl } from '@angular/forms';

@Component({
  selector: 'app-widget-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupWidgetComponent  {

  public email: string;
  public mobNumber: number;
  public password: string;
  public name: string;
  public nickName: string;

  public error: string;
  public success_message:string;
  public success_flag:boolean = false;
  public error_message:string;
  focus:boolean;
  focus1:boolean;

  constructor(
      private auth: AuthService, 
      private router: Router,
      private fb:FormBuilder
    ){}

  /*
  //Reactive Form
  createForm:FormGroup;

  ngOnInit() {

    this.createForm=this.fb.group({
        email:["",Validators.required],
        mobNumber: [""],
        name:["",Validators.required],
        nickName:["",Validators.required],
        password:["",Validators.required]
       })

  }
  */
  public createAccount() {
    this.auth.signup(this.name,this.nickName,this.mobNumber,this.email, this.password)
      .pipe(first())
      .subscribe(
        result =>{
          this.success_message="Explorer Account Created";
          this.success_flag = true;
          this.email=null;
          this.password=null;
          this.mobNumber=null;
          this.name=null;
          this.nickName=null;
        } ,
        err => {
          this.error_message = 'Explorer Account not created, '+err.message;
        }
      );
  }

}