import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'generic-api-resource-link-buttons',
  template: `    
    <ng-container *ngIf="!_item.uri">
        {{_item.label}}
    </ng-container>
    <button *ngIf="_item.uri" mat-raised-button color="primary" (click)="linkButtonClicked(_item); $event.stopPropagation()">
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
    if(resource.uri.startsWith('http')) {
      window.location = resource.uri;
    } else {
      this.router.navigateByUrl(resource.uri);
    }
  }

}
