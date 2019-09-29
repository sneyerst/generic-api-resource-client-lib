import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-status-icons',
  template: `
    <div class="status-icon {{getClass(item)}}" *ngFor="let item of _items; let i=index">
        <div class="index-value">{{i+1}}</div>
        <mat-icon aria-hidden="false" aria-label="Truck">
            {{_icon}}
        </mat-icon>
    </div>
   
  `,
  styleUrls: [],
  providers: []
})
export class StatusIconsComponent {

  _icon: string = 'local_shipping';
  _items: any[];

  getClass(item) {
    if(item < 50) {
      return 'space_left';
    } else {
      if (item > 100) {
        return 'overloaded';
      } else {
        return 'ok';
      }
    }
  }

  @Input()
  set items(items) {
    this._items = items;
  }

}
