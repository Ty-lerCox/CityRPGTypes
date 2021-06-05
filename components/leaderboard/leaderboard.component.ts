import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data/player-data.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  constructor(private playerDataService: PlayerDataService) {}

  ngOnInit(): void {
    this.playerDataService.getNewWorth();
  }
}
