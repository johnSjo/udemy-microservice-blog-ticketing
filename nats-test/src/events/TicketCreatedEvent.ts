import { Subjects } from './Subjects';

export interface TicketCreatedEvent {
  subject: Subjects.TICKET_CREATED;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
