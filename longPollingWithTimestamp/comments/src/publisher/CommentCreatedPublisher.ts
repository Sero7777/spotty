import {CommentCreatedEvent, Publisher, Topics} from "@spotty/shared"

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
    topic: Topics.CommentCreated = Topics.CommentCreated;
}