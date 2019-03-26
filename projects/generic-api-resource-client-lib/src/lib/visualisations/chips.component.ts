import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-chips',
  template: `
    <mat-chip-list>
      <mat-chip color="primary" *ngFor="let item of _items">{{item.label}}</mat-chip>
    </mat-chip-list>
  `,
  styleUrls: [],
  providers: []
})
export class ChipsComponent {

  _items: any[];

  @Input()
  set items(items) {
    this._items = items;
  }

}
