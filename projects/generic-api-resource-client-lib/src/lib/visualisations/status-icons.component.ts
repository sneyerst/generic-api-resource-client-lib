import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-status-icons',
  template: `
    <div class="status-icon" *ngFor="let item of _items; let i=index">
        <div class="index-value">{{i}}</div>
        <mat-icon aria-hidden="false" aria-label="Truck">
            {{_icon}}
        </mat-icon>
        <div class="percent-value">100%</div>
    </div>
   
  `,
  styleUrls: [],
  providers: []
})
export class StatusIconsComponent {

  _icon: string = 'local_shipping';
  _items: any[];

  @Input()
  set items(items) {
    this._items = items;
  }

}
