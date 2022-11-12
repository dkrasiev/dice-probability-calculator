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
      count: 1,
      value: 1,
    },
    count: 16,
    knownValues: [],
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

  public parseKnownValues(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.config.knownValues = value
      .split(' ')
      .map((value) => Number.parseInt(value))
      .filter((value) => value);
  }
}
