import { Component, OnInit } from "@angular/core";
import { PlayerExt } from "../../types/player-data.model";
import { PlayerDataService } from "../player-data/player-data.service";
import { AtmService } from "./atm.service";
import { Bank } from "../../types/bank.model";
import { Location } from "../../types/location.model";

@Component({
  selector: "app-atm",
  templateUrl: "./atm.component.html",
  styleUrls: ["./atm.component.scss"],
})
export class AtmComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  bank: Bank = {} as Bank;
  location = Location;
  amount = 10;

  constructor(
    private atmService: AtmService,
    private playerDataService: PlayerDataService
  ) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
      this.atmService.getBank(player.player.id);
    });
    this.atmService.bankChanged.subscribe((bank: Bank) => {
      this.bank = bank;
    });
    this.player = this.playerDataService.player;
    this.atmService.getBank(this.player.player.id);
  }

  createAccount(): void {
    this.atmService.createAccount(this.player.player.id);
  }

  withdraw(): void {
    this.atmService.withdrawMoney("", this.player.player.id, this.amount);
  }

  deposit(): void {}

  getHeist(): boolean {
    return this.playerDataService.hasComputer();
  }

  addAmount(amount: number): void {
    this.amount += amount;
  }

  depositAll(): void {
    this.atmService.depositMoney("", this.player.player.id, this.bank.wallet);
  }

  withdrawAll(): void {
    this.atmService.withdrawMoney("", this.player.player.id, this.bank.amount);
  }
}
