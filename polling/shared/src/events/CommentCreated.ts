import { Topics } from "./topics";

export interface CommentCreatedEvent {
  topic: Topics.CommentCreated;
  data: {
    id: string;
    version: number;
    spot: string;
    content: string;
  };
}
