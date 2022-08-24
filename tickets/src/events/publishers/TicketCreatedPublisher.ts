import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@johnsjo_ed_tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED;
}
