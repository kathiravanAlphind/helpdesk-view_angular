import {Component, OnInit} from '@angular/core';
import {Login} from './login';
import { LoginService } from './login.service';
import {ToastrService} from 'ngx-toastr';

@Component(
    {
        selector : 'app-login',
        templateUrl : './login.component.html',
        styleUrls : ['./login.component.css']
    }
)
export class LoginComponent implements OnInit{


    users =  new Array<Login>();
    uname: string;
    pass: string;

    constructor(private _loginservice: LoginService, private toastr: ToastrService){}

    ngOnInit():void{
        let mobj = localStorage.getItem('name');
        if(mobj == this.uname){
            console.log("login success");
        }
    }
    
    checkUser(){
        if(this.uname!= null && this.pass!=null){
            localStorage.setItem('name', this.uname);
            this._loginservice.checkUser(this.uname, this.pass)
        .subscribe((userData) => 
        {this.users = userData,
             console.log(userData)
             let mobj = localStorage.getItem('name');
             if(mobj == this.uname){
                 console.log("login success");
             }
            
            },
             
             (error) =>  
            {console.log(error);
            });
        }
        //this._loginservice.checkUser(this.uname, this.pass)
        //.subscribe((userData) => {this.users = userData, console.log(userData)},(error) => {console.log(error);});
            //this.toastr.error("Password missing","Field required");

        else{
            this.toastr.error("Password missing","Field required");
        }
    }

}