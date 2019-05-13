import { Injectable } from '@angular/core';

import {Login} from './login' // might not need depending on where you handle data processing
import { Observable } from 'rxjs/Observable';
import {Http, Response, RequestOptions, Headers} from '@angular/http'; // NO LONGER NEEDED

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import { response } from 'express';

@Injectable()
export class LoginService{

    constructor( private _http : Http){} // changed httpService to _http to make easier; updated Http to HttpClient

    checkUser(uname: string, pass: string): Observable<Login[]> { // added arguments for username and password //inserted GET HTTP method url; TODO hash pass
        return this._http.get("http://localhost:8080/helpdesk/login?uname="+uname+"&pass="+pass)
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }
    private handleError(error :Response)
    {
        return Observable.throw(error);
    }

}

