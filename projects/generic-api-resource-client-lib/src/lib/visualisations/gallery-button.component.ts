import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'generic-api-resource-gallery-button',
  template: `    
    <button mat-raised-button color="primary" (click)="openGallery(_item); $event.stopPropagation()">
      View in gallery
    </button>
  `,
  styleUrls: [],
  providers: []
})
export class GalleryButtonComponent {

  _item: any[];

  constructor(
    private router: Router
  ) {
  }

  @Input()
  set item(item) {
    this._item = item;
  }

 openGallery(item) {
    console.log(item);
 }

}
