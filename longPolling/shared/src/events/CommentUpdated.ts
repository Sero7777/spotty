import { Topics } from "./topics";

export interface CommentUpdatedEvent {
  topic: Topics.CommentUpdated;
  data: {
    id: string;
    spot: string;
    content: string;
  };
}
