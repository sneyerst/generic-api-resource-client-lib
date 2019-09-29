import {Component, Input} from '@angular/core';

@Component({
  selector: 'generic-api-resource-status-icons',
  template: `
   status icons <mat-icon aria-hidden="false" aria-label="Example home icon">home</mat-icon>
  `,
  styleUrls: [],
  providers: []
})
export class StatusIconsComponent {

  _items: any[];

  @Input()
  set items(items) {
    this._items = items;
  }

}
