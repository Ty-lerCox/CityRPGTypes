import { Component, OnInit } from "@angular/core";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-trader",
  templateUrl: "./trader.component.html",
  styleUrls: ["./trader.component.scss"],
})
export class TraderComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  location = Location;

  constructor(private playerDataService: PlayerDataService) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
    this.player = this.playerDataService.player;
  }
}
