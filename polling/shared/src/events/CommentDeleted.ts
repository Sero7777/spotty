import { Topics } from './topics';

export interface CommentDeletedEvent {
  subject: Topics.CommentDeleted;
  data: { 
    id: string;
    spot: string;
  };
}
