import { Topics } from './topics';

export interface CommentCreatedEvent {
  subject: Topics.CommentCreated;
  data: { 
    id: string;
    version: number;
    spot: string;
    content: string;
  };
}
