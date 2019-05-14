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

    }

    createTicket() : Observable<Tickets[]>{
        return this._http.get("http://localhost:8080/helpdesk/create")
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }

    private handleError(error : Response)
    {
        return Observable.throw(error);
    }
}