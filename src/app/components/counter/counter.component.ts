import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input()
  public label: string = 'Label';

  @Input()
  public value: number = 0;
  @Output()
  public valueChange: EventEmitter<number> = new EventEmitter<number>();

  public onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.valueChange.emit(+target.value);
  }

  public increment(): void {
    this.valueChange.emit(this.value + 1);
  }

  public decrement(): void {
    this.valueChange.emit(this.value - 1);
  }
}
