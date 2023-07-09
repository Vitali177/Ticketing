import { Publisher, Subjects, TicketCreatedEvent } from "@vitali177_tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
