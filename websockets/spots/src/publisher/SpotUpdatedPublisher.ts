import {SpotUpdatedEvent, Publisher, Topics} from "@spotty/shared"

export class SpotUpdatedPublisher extends Publisher<SpotUpdatedEvent> {
    topic: Topics.SpotUpdated = Topics.SpotUpdated;
}