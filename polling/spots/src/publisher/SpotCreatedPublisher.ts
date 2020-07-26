import {SpotCreatedEvent, Publisher, Topics} from "@spotty/shared"

export class SpotCreatedPublisher extends Publisher<SpotCreatedEvent> {
    topic: Topics.SpotCreated = Topics.SpotCreated;
}