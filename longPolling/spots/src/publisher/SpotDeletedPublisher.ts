import {SpotDeletedEvent, Publisher, Topics} from "@spotty/shared"

export class SpotDeletedPublisher extends Publisher<SpotDeletedEvent> {
    topic: Topics.SpotDeleted = Topics.SpotDeleted;
}