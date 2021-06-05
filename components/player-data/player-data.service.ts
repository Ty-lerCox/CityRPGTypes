// Core
import { Injectable, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { QueueService } from '../queue/queue.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { Employment } from '../../types/employment.model';
import { Item, ItemType } from '../../types/item.model';
import { PlayerExt } from '../../types/player-data.model';

// Interfaces & Settings

@Injectable({
  providedIn: 'root',
})
export class PlayerDataService {
  private uid = '';
  public player: PlayerExt = {} as PlayerExt;
  public employment: Employment = {} as Employment;
  public items: Item[] = [];

  @Output() playerChanged: EventEmitter<PlayerExt> = new EventEmitter();
  @Output()
  playerEmploymentChanged: EventEmitter<Employment> = new EventEmitter();
  @Output()
  playerItemsChanged: EventEmitter<Item[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private loginService: LoginService,
    private queueService: QueueService,
    private snackbarSerivce: SnackbarService
  ) {
    this.loginService.uidChanged.subscribe((uid) => {
      this.getPlayer(uid);
    });
  }

  private listenPlayerData(playerExt: PlayerExt) {
    let player;
    this.firestore
      .doc('players/' + playerExt.player.id)
      .valueChanges()
      .subscribe((doc: any) => {
        player = {
          ...(doc as PlayerExt),
        };
        this.playerChanged.emit(player);
        this.player = player;
        this.queueService.requestJobDetails(player.jobID);
      });
  }

  private listenPlayerEmployment(playerExt: PlayerExt) {
    let employment;
    this.firestore
      .doc('employments/' + playerExt.player.id)
      .valueChanges()
      .subscribe((doc: any) => {
        employment = {
          ...(doc as Employment),
        };
        this.playerEmploymentChanged.emit(employment);
        this.employment = employment;
      });
  }

  private listenPlayerItems(playerExt: PlayerExt) {
    this.firestore
      .collection('items', (ref) =>
        ref.where('owner', '==', playerExt.player.id)
      )
      .snapshotChanges()
      .pipe(
        map((items) => {
          return items.map((doc) => {
            const item: Item = doc.payload.doc.data() as Item;
            item.id = doc.payload.doc.id;
            return item;
          });
        })
      )
      .subscribe((items: any) => {
        this.playerItemsChanged.emit(items);
        this.items = items;
      });
  }

  getPlayer(uid: string) {
    let auth;
    let player;

    if (uid != null) {
      const authCollection = this.firestore.collection('auth', (ref) =>
        ref.where('userID', '==', uid)
      );
      authCollection
        .get()
        .toPromise()
        .then((authQuerySnapshot) => {
          const doc: any = authQuerySnapshot.docs[0] as any;
          if (doc !== undefined) {
            const playerID = doc.id;
            const authRef = this.firestore.doc('auth/' + playerID);
            authRef
              .get()
              .toPromise()
              .then((authSnapshot) => {
                auth = {
                  authID: authSnapshot.id,
                  ...(authSnapshot.data() as any),
                };
                this.firestore
                  .doc('players/' + playerID)
                  .get()
                  .toPromise()
                  .then((playersSnapshot) => {
                    player = {
                      ...(playersSnapshot.data() as PlayerExt),
                    };
                    if (player.player !== undefined) {
                      this.listenPlayerData(player);
                      this.listenPlayerEmployment(player);
                      this.listenPlayerItems(player);
                    }
                  });
              });
          }
        });
    }
  }

  getNewWorth(): void {}

  hasComputer(): boolean {
    if (this.items.length > -1) {
      const idxComputer = this.items.findIndex(
        (value: Item) => value.type === ItemType.Computer
      );

      if (idxComputer > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getItem(itemType: ItemType): Item {
    return this.items.find((item: Item) => item.type === itemType)!;
  }
}
