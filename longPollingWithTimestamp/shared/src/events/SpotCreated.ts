import { Topics } from "./topics";

export interface SpotCreatedEvent {
  topic: Topics.SpotCreated;
  data: {
    id: string;
    title: string;
    pic: string;
    username: string;
    description: string;
    upvotes: number;
    streetname: string;
    zip: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    category: string;
  };
}
