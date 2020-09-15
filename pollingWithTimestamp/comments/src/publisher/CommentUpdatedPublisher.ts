import {CommentUpdatedEvent, Publisher, Topics} from "@spotty/shared"

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
    topic: Topics.CommentUpdated = Topics.CommentUpdated;
}