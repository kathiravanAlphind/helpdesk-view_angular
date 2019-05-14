import { Component, OnInit, Input } from '@angular/core';
import { Tickets } from './tickets';
import { TicketService } from './tickets.service';

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


    constructor(private ticketService : TicketService){
    }

    ngOnInit(): void {
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
      this.ticketService.createTicket(this.ticket)
        .subscribe((response) => {
          console.log(response)
        },
        (error) => {
          console.log(error);
      });
    }

}