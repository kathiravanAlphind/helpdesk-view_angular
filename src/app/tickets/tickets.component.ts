import { Component, OnInit, Input } from '@angular/core';
import { Tickets } from './tickets';
import { TicketService } from './tickets.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketComponent implements OnInit{

    ticket_obj = new Array<Tickets>();
    //tickets = new Tickets();

    @Input() title =new Tickets();
    @Input() category : string;
    @Input() description : string;


    constructor(private ticketService : TicketService){
      console.log(this.title);
    }

    ngOnInit(): void {
    }

    addTickets(){
      this.ticketService.createTicket()
        .subscribe((ticketsData) => {
          this.ticket_obj = ticketsData
        },
        (error) => {
          console.log(error);
      });
    }

}