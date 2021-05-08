import { AcceptanceType, JobType } from './queue.model';
import { Employment } from './employment.model';

export interface Player {
  name: string;
  id: string;
  controller: string;
  state: string;
}

export interface PlayerExt {
  player: Player;
  pawn: string;
  pos: number[];
  worldLocation?: WorldLocation;
  location?: Location;
  locationName?: string;
  isWorking: boolean;
  jobID: string;
  jobType: JobType;
  jobAcceptCriteria: AcceptanceType;
  jobLocation: WorldLocation;
  wanted: number;
  hunger: number;
  employment?: Employment;
  inventory?: number[];
}

export interface WorldLocation {
  x: number;
  y: number;
  z: number;
}

export enum Location {
  Outside,
  Bank,
  Robbery,
  TownHall,
  Dealer,
  Police,
  Restaurant,
}
