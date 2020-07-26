import { Topics } from './topics';

export interface CommentUpdatedEvent {
  subject: Topics.CommentUpdated;
  data: {
    id: string;
    version: number;
    spot: string;
    content: string;
  };
}
