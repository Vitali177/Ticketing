import { Publisher, Subjects, TicketUpdatedEvent } from "@vitali177_tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
