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
  _renderer = null;

  @Input() set cols(cols) {
    this._cols = cols;
  }

  @Input() set renderer(renderer) {
    this._renderer = renderer;
  }

  get cols() {
    return (this._cols ? this._cols : 4);
  }

  get renderer() {
    return (this._renderer ? this._renderer : function(resource = null) { return 'no renderer defined'; });
  }

  getArray(num) {
    return Array(num).fill(0).map((x,i)=>i);
  }

  getResourceListFor(i, max) {
    const itemsPerPart = Math.ceil(this.resources.length / max);
    const startIndex = i * itemsPerPart;
    return this.resources.slice(startIndex, startIndex + itemsPerPart);
  }

  debugOutput(obj) {
    console.log(obj);
  }

  rowHeight() {
    const returnValue = this.getResourceListFor(0, this.cols)[0].length * 16;
    if(isNaN(returnValue)) {
      return 30 * 16;
    } else {
      return returnValue;
    }
  }

}
