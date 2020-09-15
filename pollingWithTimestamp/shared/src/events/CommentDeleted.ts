import { Topics } from "./topics";

export interface CommentDeletedEvent {
  topic: Topics.CommentDeleted;
  data: {
    id: string;
    spot: string;
    timestamp: number;
  };
}
