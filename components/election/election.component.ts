import { Component, OnInit } from "@angular/core";
import { Election, ElectionType } from "src/app/types/election.model";
import { PlayerExt } from "src/app/types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { ElectionService } from "./election.service";

@Component({
  selector: "app-election",
  templateUrl: "./election.component.html",
  styleUrls: ["./election.component.scss"],
})
export class ElectionComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  election: Election = {} as Election;
  voted = false;
  panelOpenState = false;

  constructor(
    private playerDataService: PlayerDataService,
    private electionService: ElectionService
  ) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
    this.electionService.electionsChanged.subscribe((elections: Election[]) => {
      if (elections) {
        this.election = elections[0];
      }
    });
  }

  getElectionName(electionType: ElectionType): string {
    switch (electionType) {
      case ElectionType.Mayor:
        return "Major";
      default:
        return "N/a";
    }
  }

  vote(): void {
    this.electionService.requestVote(this.player.player.id, this.election.id);
  }

  join(): void {
    this.electionService.requestJoin(this.player.player.id, this.election.id);
  }

  isAlreadyCandidate(): boolean {
    if (!this.player) {
      return true;
    }
    if (
      this.election.candidates.findIndex(
        (candidate: string) => candidate === this.player.player.name
      ) > -1
    ) {
      return true;
    }
    return false;
  }
}
