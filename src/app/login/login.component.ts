import {Component, OnInit} from '@angular/core';
import {Login} from './login';
import { LoginService } from './login.service';


@Component(
    {
        selector : 'app-login',
        templateUrl : './login.component.html',
        styleUrls : ['./login.component.css']
    }
)
export class LoginComponent implements OnInit{


    users : Login[];
    uname: string;
    pass: string;

    constructor(private _loginservice: LoginService){}

    ngOnInit():void{
        
    }


    checkUser(){
        this._loginservice.checkUser(this.uname, this.pass).subscribe(userData => {
            this.users = userData, 
            console.log(userData)},
         (error) => {
             console.log(error)
            });
    }

}