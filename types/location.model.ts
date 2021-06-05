import { PlayerExt } from "./player-data.model";

export interface Locations {
  player: PlayerExt;
  location: Location;
  jobLocation?: number[];
}

export enum Location {
  Outside,
  Bank,
  Robbery,
  TownHall,
  Dealer,
  Police,
  Restaurant,
  CarDealer,
}

export interface CommercialLot {
  name: string;
  owner: string;
  items: number[];
  location: Location;
  x: number;
  y: number;
  z: number;
  radius: number;
}

export enum CommercialLotItems {
  Bottle,
  Coffee,
  Burger,
  Milkshake,
}
