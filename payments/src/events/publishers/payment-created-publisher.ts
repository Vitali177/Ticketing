import { Subjects, Publisher, PaymentCreatedEvent } from '@vitali177_tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
