import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-chips',
  template: `
    <mat-chip-list>
      <mat-chip color="primary" *ngFor="let item of _items">
        <ng-container *ngIf="item.trigger"><span style="text-decoration: line-through;">{{item.label}}</span></ng-container>
        <ng-container *ngIf="!item.trigger">{{item.label}}</ng-container>
        
      </mat-chip>
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
