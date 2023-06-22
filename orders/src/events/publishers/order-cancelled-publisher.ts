import { Publisher, OrderCancelledEvent, Subjects } from '@vitali177_tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
