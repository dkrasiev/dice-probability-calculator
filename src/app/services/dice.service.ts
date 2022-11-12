import { Injectable } from '@angular/core';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  public calculateChance({
    count,
    knownValues,
    multicube,
    bet,
    faces,
  }: Config): number {
    const newCount: number = count - knownValues.length;

    const newBetCount: number =
      bet.count -
      knownValues.filter((value) => {
        if (value === bet.value) {
          return true;
        }

        return false;
      }).length;

    const targetValueChance: number = (multicube ? 2 : 1) / faces;

    return (
      targetValueChance ** newBetCount *
      (1 - targetValueChance) ** (newCount - newBetCount)
    );
  }

  public calculateChanceWithEmulation({
    count,
    knownValues,
    multicube,
    bet,
    faces,
  }: Config): number {
    const results: boolean[] = [];

    for (let i = 0; i < 9999; i++) {
      const result: number[] = [...knownValues];

      while (result.length < count) {
        result.push(this.getRandomValue(faces));
      }

      const chance: boolean =
        result.filter(
          (value: number): boolean => value === bet.value || value === multicube
        ).length >= bet.count;

      results.push(chance);
    }

    const chance: number =
      results.filter((value: boolean): boolean => value).length / results.length;

    return chance;
  }

  private getRandomValue(faceCount: number): number {
    return Math.floor(Math.random() * faceCount + 1);
  }
}
