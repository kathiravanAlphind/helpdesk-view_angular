import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Tickets } from './tickets';


@Injectable({
    providedIn: 'root',    //alternate in place of provider
})
export class TicketService{

    constructor(private _http: Http){
        //http://localhost:8080/helpdesk/create
    }

    createTicket(ticket : Tickets) {
        let body = JSON.stringify(ticket);
        let headers = new Headers({'Content-Type' : 'application/json'});
        let options =  new RequestOptions({headers : headers});
        return this._http.post("http://localhost:8080/helpdesk/create", body, options);
    }

    private handleError(error : Response)
    {
        return Observable.throw(error);
    }
}