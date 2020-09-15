import { Topics } from './topics';

export interface SpotDeletedEvent {
  topic: Topics.SpotDeleted;
  data: {
      id: string;
      timestamp: number;
  };
}
