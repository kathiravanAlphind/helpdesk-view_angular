import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Projects } from './projects';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable({
    providedIn: 'root',
})
export class ProjectService {

    constructor(private _http: Http) { }

    listProjects(tl_id: number): Observable<Projects[]> {

        return this._http.get("http://localhost:8080/helpdesk/dashboard?tl_id=" + tl_id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error);
    }

}