import { Component, OnInit, Input } from '@angular/core';
import { Tickets } from './tickets';
import { TicketService } from './tickets.service';
import { ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketComponent implements OnInit{

    ticket_obj = new Array<Tickets>();
    ticket = new Tickets();
    id : number;
    assigner : number;
    users : any;
    proj : any;


    constructor(private ticketService : TicketService,private route: ActivatedRoute){
      this.users = JSON.parse(localStorage.getItem('CurrentUser'));
      //this.id = this.users[0].id;
      this.proj = JSON.parse(localStorage.getItem('CurrentProject'));
      //this.assigner = this.proj[0].id;
      
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.ticket.project_id = params.id; // --> Name must match wanted parameter
      });
    }

    /*
    projectForm(value : any){
      this.modalService.open(value, {
          size: 'lg'
        });
  }

  closeModal(){
      this.modalService.dismissAll();
      this.router.navigate(['/dashboard'])
  }
  */

    addTickets():void{
      
      this.ticket.submitted_by = this.users[0].id.toString();
      this.ticketService.createTicket(this.ticket)
        .subscribe((response) => {
          console.log(response)
        },
        (error) => {
          console.log(error);
      });
    }

}