import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AppService } from "src/app/app.service";
import { AtmService } from "../atm/atm.service";
import { Bank } from "../../types/bank.model";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { PropertiesService } from "./properties.service";
import { Property, PropertyType } from "../../types/property.model";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-properties",
  templateUrl: "./properties.component.html",
  styleUrls: ["./properties.component.scss"],
})
export class PropertiesComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  bank: Bank = {} as Bank;
  location = Location;
  propertiesForSale: Property[] = [];
  dataSource: MatTableDataSource<any> = {} as MatTableDataSource<any>;

  displayedColumns: string[] = ["name", "cost", "button"];

  constructor(
    private atmService: AtmService,
    private playerDataService: PlayerDataService,
    private propertiesService: PropertiesService,
    private appService: AppService
  ) {
    this.player = this.playerDataService.player;
    this.propertiesForSale = this.propertiesService.properties;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
      if (this.player.location === Location.Bank) {
        this.atmService.getBank(player.player.id);
      }
    });
    this.atmService.bankChanged.subscribe((bank: Bank) => {
      this.bank = bank;
    });
    this.propertiesService.propertiesChanged.subscribe(
      (properties: Property[]) => {
        this.dataSource = new MatTableDataSource(properties);

        this.propertiesForSale = properties.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
      }
    );
    this.appService.hideAllChanged.subscribe(() => {
      this.propertiesService.listenProperties();
    });
  }

  purchase(propertyID: string): void {
    this.propertiesService.requestPurchase(this.player.player.id, propertyID);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
