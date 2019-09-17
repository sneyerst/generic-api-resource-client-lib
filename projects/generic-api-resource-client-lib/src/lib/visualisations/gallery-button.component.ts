import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";

@Component({
  selector: 'generic-api-resource-gallery-button',
  template: `
      <button *ngIf="_item.length > 0" mat-raised-button color="primary"
              (click)="openGallery(_item); $event.stopPropagation()">
          View in gallery
      </button>
  `,
  styleUrls: [],
  providers: []
})
export class GalleryButtonComponent {

  _item: any[];

  constructor(private router: Router) {
  }

  @Input()
  set item(item) {
    this._item = item;
  }

  openGallery(items) {
    let pswpElement = document.querySelectorAll('.pswp')[0] as HTMLElement;

    // define options (if needed)
    let options = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    let gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }

}
