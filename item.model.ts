export interface Item {
  id: string;
  cost: number;
  durability: number;
  name: string;
  owner: string;
  type: ItemType;
}

export enum ItemType {
  Computer,
}
