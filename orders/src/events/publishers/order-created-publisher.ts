import { Publisher, OrderCreatedEvent, Subjects } from '@vitali177_tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
