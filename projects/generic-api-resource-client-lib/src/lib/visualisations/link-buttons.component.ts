import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'generic-api-resource-link-buttons',
  template: `
    <button mat-raised-button color="primary" (click)="linkButtonClicked(_item); $event.stopPropagation()">
      {{_item.label}}
    </button>
  `,
  styleUrls: [],
  providers: []
})
export class LinkButtonsComponent {

  _item: any;

  constructor(
    private router: Router
  ) {
  }

  @Input()
  set item(item) {
    this._item = item;
  }

  linkButtonClicked(resource: any) {
    this.router.navigateByUrl(resource.uri);
  }

}
