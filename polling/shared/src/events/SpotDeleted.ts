import { Topics } from './topics';

export interface SpotDeletedEvent {
  subject: Topics.SpotDeleted;
  data: {
      id: string;
  };
}
