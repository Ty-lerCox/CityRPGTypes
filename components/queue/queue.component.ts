import { Component, OnInit } from '@angular/core';
import { PlayerExt } from '../../types/player-data.model';
import { PlayerDataService } from '../player-data/player-data.service';
import { Job, JobType } from '../../types/queue.model';
import { QueueService } from './queue.service';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ThemePalette } from '@angular/material/core';
import { AcceptanceType } from '../../types/queue.model';
import { Location } from "../../types/location.model";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  location = Location;
  jobs: Job[] = [];
  job: Job = { accepted: false } as Job;
  jobType = JobType;
  jobStarted = false;
  timerComplete = false;
  AcceptanceType = AcceptanceType;

  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;

  constructor(
    private playerDataService: PlayerDataService,
    private queueService: QueueService
  ) {
    this.player = this.playerDataService.player;
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
    });
    this.queueService.jobsChanged.subscribe((jobs: Job[]) => {
      this.jobs = jobs;
    });
    this.queueService.jobChanged.subscribe((job: Job) => {
      this.job = job;
    });
    this.jobs = this.queueService.jobs;
    this.player = this.playerDataService.player;
  }

  accept(jobID: string): void {
    this.queueService.requestJob(this.player.player.id, jobID);
  }

  getJobName(jobType: JobType): string {
    switch (jobType) {
      case JobType.Robbery:
        return 'Robbery';
      case JobType.Crime:
        return 'Capture Criminal';
      default:
        return 'Na';
    }
  }

  getJobDetails(): void {
    this.queueService.requestJobDetails(this.player.jobID);
  }

  beginRobbery(jobID: string): void {
    this.queueService.startJob(this.player.player.id, jobID);
    this.value = 0;
    this.jobStarted = true;
    const robberyTimer = setInterval(() => {
      this.value = this.value + this.getRandomInt(0, 2);
      if (this.value > 100) {
        clearInterval(robberyTimer);
        this.jobStarted = false;
        this.timerComplete = true;
      }
      if (this.player.location !== this.location.Robbery) {
        clearInterval(robberyTimer);
        this.jobStarted = false;
        this.timerComplete = false;
      }
    }, this.getRandomInt(150, 400));
  }

  endRobbery(jobID: string): void {
    this.timerComplete = false;
    this.jobStarted = false;
    this.queueService.completeJob(this.player.player.id, jobID);
  }

  private getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
