import { Topics } from "./topics";

export interface CommentUpdatedEvent {
  topic: Topics.CommentUpdated;
  data: {
    id: string;
    version: number;
    spot: string;
    content: string;
  };
}
