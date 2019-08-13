import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GenericApiResource} from "../generic-api-resource";
import {FilesService} from '../files/files.service';
import {ResourceService} from "../services/resource.service";
import {MatSnackBar} from "@angular/material";
import {ListComponent} from "../list/list.component";

@Component({
  selector: 'generic-api-resource-gridlist',
  templateUrl: 'gridlist.component.html',
  styleUrls: [],
  providers: [ResourceService, FilesService]
})
export class GridlistComponent extends ListComponent implements OnInit {

  _cols: number;

  @Input() set cols(cols) {
    this._cols = cols;
  }

  get cols() {
    return (this._cols ? this._cols : 4);
  }

}
