import { AcceptanceType, JobType } from "./queue.model";
import { Employment } from "./employment.model";

export interface Player {
  name: string;
  id: string;
  controller: string;
  state: string;
  getOmegga(): any;
  getGhostBrick(): any;
  clone(): Player;
  getTemplateBoundsData(): any;
  clearBricks(quiet: boolean): void;
}

export class PlayerObject {
  name: string;
  id: string;
  controller: string;
  state: string;

  constructor(name: string, id: string, controller: string, state: string) {
    this.name = name;
    this.id = id;
    this.controller = controller;
    this.state = state;
  }
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

export class WorldLocation {
  public static mapWorldLocation(xyz: number[]): WorldLocation {
    return {
      x: xyz[0],
      y: xyz[1],
      z: xyz[2],
    };
  }
}

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

export enum Location {
  Outside,
  Bank,
  Robbery,
  TownHall,
  Dealer,
  Police,
  Restaurant,
}
