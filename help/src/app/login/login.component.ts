import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component(
    {
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }
)
export class LoginComponent implements OnInit {


    users = new Array<Login>();
    uname: string;
    pass: string;

    constructor(private _loginservice: LoginService, private toastr: ToastrService, private routing: Router) { }

    ngOnInit(): void {

    }


    checkUser() {
        if (this.uname != null && this.pass != null) {
            localStorage.setItem('name', this.uname);
            this._loginservice.checkUser(this.uname, this.pass)
                .subscribe((userData) => {
                    if (userData.length > 0) {
                        this.users = userData,
                            localStorage.setItem('CurrentUser', JSON.stringify(userData))
                            this.routing.navigate(['dashboard']);
                        console.log(userData)
                    }
                },
                    (error) => {
                        console.log(error);
                    });
        }

        else {
            this.toastr.error("Password missing", "Field required");
        }
    }

}