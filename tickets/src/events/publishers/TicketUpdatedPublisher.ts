import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@johnsjo_ed_tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED;
}
