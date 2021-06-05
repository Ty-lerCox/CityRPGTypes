import { Component, OnInit } from "@angular/core";
import { Employment } from "../../types/employment.model";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { QueueService } from "../queue/queue.service";
import { RestaurantService } from "./restaurant.service";
import { StoreItem } from "../../types/storeItem.model";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.component.html",
  styleUrls: ["./restaurant.component.scss"],
})
export class RestaurantComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  employment: Employment = {} as Employment;
  location = Location;
  allStoreItems: StoreItem[] = [];
  storeItems: StoreItem[] = [];

  constructor(
    private playerDataService: PlayerDataService,
    private restaurantService: RestaurantService,
    private queueService: QueueService
  ) {
    this.player = this.playerDataService.player;
    this.employment = this.playerDataService.employment;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
      this.storeItems = this.allStoreItems.filter(
        (storeItem: StoreItem) =>
          storeItem.storeName === this.player.locationName
      );
    });
    this.playerDataService.playerEmploymentChanged.subscribe(
      (employment: Employment) => {
        this.employment = employment;
      }
    );
    this.restaurantService.storeItemsChanged.subscribe(
      (storeItems: StoreItem[]) => {
        this.allStoreItems = storeItems;
        this.storeItems = this.allStoreItems.filter(
          (storeItem: StoreItem) =>
            storeItem.storeName === this.player.locationName
        );
      }
    );
    this.player = this.playerDataService.player;
    this.employment = this.playerDataService.employment;
  }

  buyItem(storeID: string) {
    if (this.player.locationName !== undefined) {
      this.restaurantService.requestPurchase(
        this.player.player.id,
        storeID,
        this.player.locationName
      );
    }
  }

  applyForJob() {
    if (this.player.locationName !== undefined) {
      this.restaurantService.applyForJob(
        this.player.player.id,
        this.player.locationName
      );
    }
  }

  leaveJob() {
    if (this.player.locationName !== undefined) {
      this.restaurantService.leaveJob(this.player.player.id);
    }
  }

  acceptPaycheck() {
    if (this.player.locationName !== undefined) {
      this.restaurantService.acceptPaycheck(this.player.player.id);
    }
  }
}
