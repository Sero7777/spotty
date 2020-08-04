import { Topics } from "./topics";

export interface SpotUpdatedEvent {
  topic: Topics.SpotUpdated;
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
