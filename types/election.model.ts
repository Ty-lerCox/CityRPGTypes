export enum ElectionType {
  Mayor,
}
export interface Election {
  id: string;
  active: boolean;
  candidates: string[];
  cityName: string;
  type: ElectionType;
  next: Date;
}
export const ElectionNames = ["Mayor"];
