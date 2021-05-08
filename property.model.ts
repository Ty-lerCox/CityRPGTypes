export interface Property {
  propertyID: string;
  cost: number;
  location: number[];
  type: PropertyType;
  name: string;
}

export enum PropertyType {
  Lot,
}
