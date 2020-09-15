import {CommentDeletedEvent, Publisher, Topics} from "@spotty/shared"

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
    topic: Topics.CommentDeleted = Topics.CommentDeleted;
}