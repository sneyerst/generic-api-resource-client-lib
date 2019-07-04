import {Component, Input} from '@angular/core'
import { MatDialog } from '@angular/material/dialog';
import {UploadService} from "./upload.service";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: [],
})
export class UploadComponent {
  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  @Input()
  url: string = 'http://localhost:8000/upload';

  @Input()
  multiple: boolean = false;

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
      data: {
        multiple: this.multiple,
        url: this.url
      }
    })
  }
}
