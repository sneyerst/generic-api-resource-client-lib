import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-status-icons',
  template: `
    <div class="status-icon {{getClass(item)}}" *ngFor="let item of _items; let i=index">
        <div class="index-value" (click)="showMessage(item)">{{i+1}}</div>
        <mat-icon aria-hidden="false" aria-label="Truck" (click)="showMessage(item)">
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

  showMessage(item) {
    if(item < 50) {
      alert("There is still more than 50% of space left in truck.");
    } else {
      if (item > 100) {
        alert("This truck is overloaded.");
      } else {
      }
    }
  }

  @Input()
  set items(items) {
    this._items = items;
  }

}
