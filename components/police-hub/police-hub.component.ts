import { Component, OnInit } from "@angular/core";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { PoliceHUBService } from "../police-hub/police-hub.service";
import { WantedPlayer } from "../../types/police-hub.model";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AcceptanceType } from "../../types/queue.model";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-police-hub",
  templateUrl: "./police-hub.component.html",
  styleUrls: ["./police-hub.component.scss"],
})
export class PoliceHUBComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  location = Location;
  wantedPlayers: PlayerExt[] = [];
  faStar = faStar;
  AcceptanceType = AcceptanceType;

  constructor(
    private playerDataService: PlayerDataService,
    private policeHUBService: PoliceHUBService
  ) {
    this.player = this.playerDataService.player;
    this.wantedPlayers = this.policeHUBService.wantedPlayers;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
    this.policeHUBService.wantedPlayersChanged.subscribe(
      (wantedPlayers: PlayerExt[]) => {
        this.wantedPlayers = wantedPlayers;
      }
    );
  }

  getWantedPlayers(): void {
    this.policeHUBService.getWantedPlayers();
  }

  getWantedLevelStars(wanted: number): number[] {
    if (wanted >= 5000) {
      return [0, 1, 2, 3, 4];
    } else if (wanted >= 2500) {
      return [0, 1, 2, 3];
    } else if (wanted >= 1500) {
      return [0, 1, 2];
    } else if (wanted >= 500) {
      return [0, 1];
    } else if (wanted > 0) {
      return [0];
    } else {
      return [];
    }
  }

  suitUp(): void {
    this.policeHUBService.requestSuit(
      this.player.player.id,
      "1HSUAhTXLGqgNMSk93GV"
    );
  }

  joinForce(): void {
    this.policeHUBService.requestJob(this.player.player.id, 1);
  }
}
