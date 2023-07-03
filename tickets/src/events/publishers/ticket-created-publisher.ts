import { Publisher, Subjects } from "@vitali177_tickets/common";

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
