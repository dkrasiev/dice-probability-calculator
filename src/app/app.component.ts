import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config } from './models/config';
import { DiceService } from './services/dice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public chance: number = 0;

  public config: Config = {
    bet: {
      count: 4,
      value: 6,
    },
    count: 16,
    knownValues: [3, 3, 5],
    multicube: 1,
    faces: 6,
  };

  constructor(private diceService: DiceService) {}

  public ngOnInit(): void {
    this.calculcateChance();
  }

  public calculcateChance() {
    this.chance = this.diceService.calculateChanceWithEmulation(this.config);
  }

  public addNewValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.config.knownValues.push(Number.parseInt(target.value));
    target.value = 'qwerty';
  }

  public parseKnownValues(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.config.knownValues = value
      .split(' ')
      .map((value) => Number.parseInt(value))
      .filter((value) => value);
  }

  public removeIndex(index: number) {
    this.config.knownValues = this.config.knownValues.filter(
      (v, i) => i !== index
    );
  }
}
