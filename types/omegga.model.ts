import { Player, PlayerExt } from "./player-data.model";

export interface Omegga {
  getPlayer(user: any): Player;
  on(
    arg0: string,
    arg1: (user: any, subcommand: number, ...args: any) => Promise<void>
  ): any;
  broadcast(message: string): void;
  whisper(playerID: String, message: string): void;
  getPlayer(id: string): Player;
  getPlayers(): Player[];
  findPlayerByName(name: string): Player;
  getAllPlayerPositions(): Promise<PlayerExt[]>;
  saveBricks(name: string, quiet: boolean): void;
  loadBricks(name: string, quiet: boolean): void;
  loadSaveData(saveData: string, object: { quiet: boolean }): Promise<void>;
  getSaves(): string[];
  clearAllBricks(quiet: boolean): void;
  start(): Promise<void>;
  stop(): Promise<void>;
  watchLogChunk(
    cmd: string,
    pattern: RegExp,
    chunkOptions: ChunkOptions
  ): Promise<any[]>;
  addWatcher(pattern: RegExp, watcherOptions: WatcherOptions): Promise<any>;
  addMatcher(pattern: RegExp, callback: Function): void;
  clearBricks(target: any, quiet: boolean): any;
}

export interface ChunkOptions {
  first: string;
  last: Function;
  afterMatchDelay: number;
  timeoutDelay: number;
}

export interface WatcherOptions {
  timeoutDelay: number;
  bundle: boolean;
  debounce: boolean;
  last?: Function;
  afterMatchDelay?: number;
  exec: Function;
}
