import { Publisher, ExpirationCompleteEvent, Subjects } from '@vitali177_tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
