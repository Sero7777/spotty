import { Topics } from "./topics";

export interface CommentCreatedEvent {
  topic: Topics.CommentCreated;
  data: {
    id: string;
    spot: string;
    content: string;
    username: string;
    timestamp: number;
  };
}
