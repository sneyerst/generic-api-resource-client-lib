import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FilesService} from "../files/files.service";

@Component({
  selector: 'generic-api-resource-file-buttons',
  template: `
      <ng-container *ngIf="!_item.uri">
          {{_item.label}}
      </ng-container>
      <button *ngIf="_item.uri" mat-raised-button color="primary"
              (click)="linkButtonClicked(_item); $event.stopPropagation()">
          {{_item.label}}
      </button>
  `,
  styleUrls: [],
  providers: []
})
export class FileButtonsComponent {

  _item: any;

  constructor(
    private router: Router,
    private filesService: FilesService
  ) {
  }

  @Input()
  set item(item) {
    this._item = item;
  }

  linkButtonClicked(resource: any) {
    this.filesService.download(resource.uri).subscribe((data: any) => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should

      const blob = new Blob([(data)], { type: 'application/octet-stream' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      // const downloadURL = URL.createObjectURL(newBlob);
      // window.open(downloadURL);

      const downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      if (resource.uri.endsWith('xlsx')) {
        link.download = 'download.xlsx';
      } else {
        link.download = 'download.pdf';
      }
      document.body.appendChild(link);
      link.click();
      setTimeout(function(){
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadURL);
      }, 100);

    });
  }

}
