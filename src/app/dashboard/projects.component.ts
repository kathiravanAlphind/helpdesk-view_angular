import { Component, OnInit } from '@angular/core';
import { Projects } from './projects';
import { ProjectService } from './projects.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectComponent implements OnInit{

    projects = new Array<Projects>();
    ticket = new Projects();
    id :number;
    user:any;
    isForm = true;
    constructor(private proService : ProjectService, private modalService: NgbModal){
        this.user =JSON.parse(localStorage.getItem('CurrentUser'));
        this.id = this.user[0].id;
        console.log(this.id);
    }

    ngOnInit(): void {
        this.listProjects()
    }

    listProjects(){

        this.proService.listProjects(this.id)
        .subscribe((projectsList) => {
            this.projects = projectsList
        },

        (error) => {
            console.log(error);
        });
    }

    projectForm(value : any){
        this.modalService.open(value, {
            size: 'lg'
          });
    }
}