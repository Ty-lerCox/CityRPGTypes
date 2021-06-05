import { Component, OnInit } from '@angular/core';
import { PlayerDataService } from '../player-data/player-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private playerDataService: PlayerDataService) {}

  ngOnInit(): void {}

  signout() {}
}
