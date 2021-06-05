// Core
import { Injectable, EventEmitter, Output } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Interface & Settings
import { environment } from 'src/environments/environment';
import { Job } from '../../types/queue.model';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  jobs: Job[] = [];
  job: Job = {} as Job;

  @Output() jobChanged: EventEmitter<Job> = new EventEmitter();
  @Output() jobsChanged: EventEmitter<Job[]> = new EventEmitter();

  constructor(
    private firestore: AngularFirestore,
    private httpClient: HttpClient,
    private snackbarSerivce: SnackbarService
  ) {
    this.listenJobs();
  }

  listenJobs(): void {
    this.firestore
      .collection('jobs', (ref) => ref.where('accepted', '==', false))
      .snapshotChanges()
      .subscribe((data: any) => {
        let jobs = data.map((e: any) => {
          return {
            jobID: e.payload.doc.id,
            ...(e.payload.doc.data() as any),
          } as Job;
        });
        this.jobs = jobs;
        this.jobsChanged.emit(jobs);
      });
  }

  requestJob(playerID: string, jobID: string) {
    this.httpClient
      .post(
        environment.api + '/claimJob?playerID=' + playerID + '&jobID=' + jobID,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
      .toPromise()
      .then((res: any) => {
        switch (res.status) {
          case 200:
            this.snackbarSerivce.createSnackbar('', res.message, 2000, false);
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  startJob(playerID: string, jobID: string) {
    this.httpClient
      .post(
        environment.api +
          '/startRobbery?playerID=' +
          playerID +
          '&jobID=' +
          jobID,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
      .toPromise()
      .then((res: any) => {
        switch (res.status) {
          case 200:
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  completeJob(playerID: string, jobID: string) {
    this.httpClient
      .post(
        environment.api +
          '/endRobbery?playerID=' +
          playerID +
          '&jobID=' +
          jobID,
        {},
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        }
      )
      .toPromise()
      .then((res: any) => {
        switch (res.status) {
          case 200:
            this.job.isComplete = true;
            this.jobChanged.emit(this.job);
            this.snackbarSerivce.createSnackbar('', res.message, 2000, false);
            break;
          default:
            this.snackbarSerivce.createSnackbar('', res.message, 4000, true);
            break;
        }
      })
      .catch((err) => {});
  }

  requestJobDetails(jobID: string) {
    const jobRef = this.firestore.doc('jobs/' + jobID);
    jobRef
      .get()
      .toPromise()
      .then((jobsSnapshot: any) => {
        const job: Job = {
          jobID: jobsSnapshot.id,
          ...(jobsSnapshot.data() as any),
        } as Job;
        this.job = job;
        this.jobChanged.emit(job);
      });
  }
}
