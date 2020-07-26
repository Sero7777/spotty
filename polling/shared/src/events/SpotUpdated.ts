import { Topics } from "./topics";

export interface SpotUpdatedEvent {
  topic: Topics.SpotUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    pic: string;
    username: string;
    description: string;
    rating: number;
    streetname: string;
    zip: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    category: string;
  };
}
