import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Item, ItemType } from "../../types/item.model";
import { PlayerExt } from "../../types/player-data.model";
import { EventsService } from "../events.service";
import { PlayerDataService } from "../player-data/player-data.service";
import { HeistService } from "./heist.service";
declare const $: any;

@Component({
  selector: "app-heist",
  templateUrl: "./heist.component.html",
  styleUrls: ["./heist.component.scss"],
})
export class HeistComponent implements OnInit {
  player: PlayerExt = {} as PlayerExt;
  mydiv: ElementRef = {} as ElementRef;

  visible = false;
  started = false;
  completed = false;
  attempts = 0;

  numbers = [1, 2, 3, 4];
  secondNumbers = [1, 2, 3, 4];
  shapes = ["circle", "square", "rectangle", "triangle"];
  colors = [
    "blue",
    "green",
    "red",
    "orange",
    "yellow",
    "purple",
    "black",
    "white",
  ];
  options = [
    "color text",
    "shape text",
    "background color",
    "shape color",
    "shape",
    "text background color",
    "number color",
  ];
  answer = "";
  question = "";
  cancelKey = 0;
  streak = 0;
  maxStreak = 0;
  list: any[] = [];

  constructor(
    private playerDataService: PlayerDataService,
    private heistService: HeistService,
    private eventsService: EventsService
  ) {
    this.player = this.playerDataService.player;
    this.visible = this.playerDataService.hasComputer();
  }

  ngOnInit(): void {
    this.playerDataService.playerChanged.subscribe((player: PlayerExt) => {
      this.player = player;
      this.visible = this.playerDataService.hasComputer();
    });
  }

  startHeist() {
    this.started = true;
    this.attempts++;
    for (let i = 1; i <= 4; i++) {
      const item = {
        root: document.getElementById(i.toString()),
        shape: document.getElementById(`shape-` + i.toString()),
        colorText: document.getElementById(`color-text-` + i.toString()),
        centerText: document.getElementById(`center-text-` + i.toString()),
        shapeText: document.getElementById(`shape-text` + i.toString()),
        overlayNumber: document.getElementById(
          `overlay-number-` + i.toString()
        ),
      };
      this.list.push(item);
    }
    this.start();
    this.eventsService.addEvent("startHeist", {
      startHeistPlayerID: this.player.player.id,
    });
  }

  sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  randomNumber(max: number, min: number, except = 0): any {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num === except ? this.randomNumber(max, min, except) : num;
  }

  getAnswerFromString(
    query: string,
    number: any,
    shape: any,
    backgroundColor: any,
    numberColor: any,
    textColor: any,
    colorText: any,
    shapeText: any,
    shapeColor: any
  ): any {
    if (query == "color text") {
      return colorText;
    }
    if (query == "shape text") {
      return shapeText;
    }
    if (query == "background color") {
      return backgroundColor;
    }
    if (query == "shape color") {
      return shapeColor;
    }
    if (query == "shape") {
      return shape;
    }
    if (query == "text background color") {
      return textColor;
    }
    if (query == "number color") {
      return numberColor;
    }
  }

  shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  handleSubmit(restart = false) {
    const playerAnswer = $("#answer").val().trim().toLowerCase();

    $(".solution").html(
      `Real numbers: ${this.numbers.join(" ")} <br> Solution: ${this.answer}`
    );

    if (this.answer === playerAnswer && !restart) {
      $(".answer-wrapper").removeClass("wrong").addClass("right");
      this.streak = this.streak + 1;
      if (this.streak > 2) {
        this.started = true;
        this.completed = true;
        this.eventsService.addEvent("endHeist", {
          endHeistPlayerID: this.player.player.id,
        });
      } else {
        this.started = true;
        this.start();
      }
    } else {
      this.maxStreak = Math.max(this.streak, this.maxStreak);
      $(".answer-wrapper").removeClass("right").addClass("wrong");
    }
    $("#streak").html(`STREAK: ${this.streak} | MAX STREAK: ${this.maxStreak}`);
  }

  start() {
    if ($(".solution").is(":hidden")) {
      this.handleSubmit(true);
    }

    const item: Item = this.playerDataService.getItem(ItemType.Computer);
    this.heistService.startHeist(item.id);

    this.shuffleArray(this.numbers);
    this.shuffleArray(this.secondNumbers);

    const firstNumber = this.randomNumber(1, 4);
    const secondNumber = this.randomNumber(1, 4, firstNumber);
    let firstAnswer = "";
    let secondAnswer = "";

    const firstSelectionIndex = this.randomNumber(0, this.options.length);
    const firstSelection = this.options[firstSelectionIndex] as any;
    const secondSelectionIndex = this.randomNumber(
      0,
      this.options.length,
      firstSelection
    );
    const secondSelection = this.options[secondSelectionIndex] as any;

    for (let i = 0; i <= 3; i++) {
      const backgroundColorIndex = this.randomNumber(0, this.colors.length);
      const shapeColorIndex = this.randomNumber(
        0,
        this.colors.length,
        backgroundColorIndex
      );

      const backgroundColor = this.colors[backgroundColorIndex];
      const shapeColor = this.colors[shapeColorIndex];

      const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
      const numberColor =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      const textColor =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      const colorText =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      const shapeText =
        this.shapes[Math.floor(Math.random() * this.shapes.length)];

      if (firstNumber == this.numbers[i]) {
        firstAnswer = this.getAnswerFromString(
          firstSelection,
          this.numbers[i],
          shape,
          backgroundColor,
          numberColor,
          textColor,
          colorText,
          shapeText,
          shapeColor
        );
      } else if (secondNumber == this.numbers[i]) {
        secondAnswer = this.getAnswerFromString(
          secondSelection,
          this.numbers[i],
          shape,
          backgroundColor,
          numberColor,
          textColor,
          colorText,
          shapeText,
          shapeColor
        );
      }

      this.list[i].root.classList.remove(...this.list[i].root.classList);
      this.list[i].root.classList.add("group", backgroundColor);
      this.list[i].shape.classList.remove(...this.list[i].shape.classList);
      this.list[i].shape.classList.add("hidden", "shape", shape, shapeColor);
      this.list[i].colorText.classList.remove(
        ...this.list[i].colorText.classList
      );
      this.list[i].colorText.classList.add(
        "hidden",
        "text",
        `${textColor}-text`
      );
      this.list[i].colorText.innerHTML = `${colorText}<br>${shapeText}`;
      this.list[i].centerText.classList.remove(
        ...this.list[i].centerText.classList
      );
      this.list[i].centerText.classList.add(
        "hidden",
        "number",
        `${numberColor}-text`
      );
      this.list[i].centerText.textContent = this.secondNumbers[i];
      this.list[i].overlayNumber.textContent = this.numbers[i];
    }

    this.answer = `${firstAnswer} ${secondAnswer}`;
    this.question = `ENTER ${firstSelection} (${firstNumber}) AND ${secondSelection} (${secondNumber})`;

    $(".real_number").css("font-size", "190px");
    $(".hidden").hide();
    $(".real_number").show();
    $(".progress-bar").css("width", "100%");
    $(".solution").hide();
    $(".answer-wrapper")[0].classList = "answer-wrapper";
    $("#answer").val("");

    this.cancelKey = Math.random();
    const instanceCancelKey = this.cancelKey;

    this.sleep(1000).then(() => {
      if (this.cancelKey !== instanceCancelKey) return;
      $(".real_number").css("font-size", "0px");

      this.sleep(2000).then(() => {
        if (this.cancelKey !== instanceCancelKey) return;
        $(".real_number").hide();
        $(".hidden").show();
        $("#answer").trigger("focus");

        $(".progress-bar").css("width", 0);

        this.sleep(8000).then(() => {
          if (this.cancelKey !== instanceCancelKey) return;
          this.handleSubmit();
          this.started = false;
        });
      });
    });
  }
}
