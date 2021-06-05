import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from './player-data.service';
import { PlayerExt } from '../../types/player-data.model';
import { AtmService } from '../atm/atm.service';
import { Bank } from '../../types/bank.model';
import {
  faStar,
  faHamburger,
  faLaptop,
  faBars,
  faArchive,
} from '@fortawesome/free-solid-svg-icons';
import { PoliceHUBService } from '../police-hub/police-hub.service';
import { AppService } from 'src/app/app.service';
import { Item } from '../../types/item.model';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.scss'],
})
export class PlayerDataComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  bank: Bank = {} as Bank;
  faStar = faStar;
  faHamburger = faHamburger;
  faLaptop = faLaptop;
  faBars = faBars;
  faArchive = faArchive;

  constructor(
    private playerDataService: PlayerDataService,
    private atmService: AtmService,
    private appService: AppService
  ) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
    this.atmService.bankChanged.subscribe((bank: Bank) => {
      this.bank = bank;
    });
    this.player = this.playerDataService.player;
  }

  getWantedLevelStars(wanted: number): number[] {
    if (wanted > 5000) {
      return [0, 1, 2, 3, 4];
    } else if (wanted > 2500) {
      return [0, 1, 2, 3];
    } else if (wanted > 1500) {
      return [0, 1, 2];
    } else if (wanted > 500) {
      return [0, 1];
    } else if (wanted > 0) {
      return [0];
    } else {
      return [];
    }
  }

  toggleHide(): void {
    this.appService.setHideAll();
  }

  getComputer(): boolean {
    return this.playerDataService.hasComputer();
  }
}
