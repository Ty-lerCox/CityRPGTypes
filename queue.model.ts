import { WorldLocation } from './player-data.model';

export interface Job {
  accepted: boolean;
  min: number;
  max: number;
  type: JobType;
  jobID: string;
  location: WorldLocation;
  acceptCriteria: AcceptanceType;
  isComplete: boolean;
  jobName: string;
}

export enum JobType {
  None,
  Robbery,
  Crime,
}

export enum AcceptanceType {
  Anyone,
  Police,
}
