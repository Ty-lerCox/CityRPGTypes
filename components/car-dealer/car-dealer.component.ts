import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { PropertiesService } from "../properties/properties.service";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-car-dealer",
  templateUrl: "./car-dealer.component.html",
  styleUrls: ["./car-dealer.component.scss"],
})
export class CarDealerComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  location = Location;

  constructor(private playerDataService: PlayerDataService) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
  }
}
