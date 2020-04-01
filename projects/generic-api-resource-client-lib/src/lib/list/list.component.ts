import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GenericApiResource} from "../generic-api-resource";
import {FilesService} from '../files/files.service';
import {ResourceService} from "../services/resource.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'generic-api-resource-list',
  templateUrl: 'list.component.html',
  styleUrls: [],
  providers: [ResourceService, FilesService]
})
export class ListComponent extends GenericApiResource implements OnInit, OnDestroy {

  _enableFilters: boolean = false;

  _enableExcelDownload: boolean = false;
  _downloadExcelURL;

  _resources: any[] = [];
  _displayedColumns: string[];

  _filters;
  _visualisations: any[] = [];

  _filtersFormGroup: FormGroup;
  _filtersFormComponents: any[] = [];

  _disabled: boolean = false;
  _rowClasses: string[] = null;
  _refreshInterval: number = 0;
  _timer;

  constructor(private resourceService: ResourceService, private router: Router, private sanitizer: DomSanitizer, private filesService: FilesService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    super();
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  ngOnInit() {
    this.setApiEndpoint(this.apiUrl, this.defaultQuery);
    this.initComponent();
  }

  goBack() {
    this.router.navigateByUrl(this.goBackUri);
  }


  initComponent() {
    this.loadFilters().then(() => {
        this.resetFilters();
        this.loadResources();
      }
    );
  }

  loadResources() {
    this.activateSpinner = true;
    this.resourceService.getResources(this._filtersFormGroup.value).then((response) => {
      this._resources = response['response']['data'];
      this._disabled = response['response']['metadata']['disabled'] ? response['response']['metadata']['disabled'] : false;
      if (response['response']['metadata']['visualisations']) {
        this._visualisations = response['response']['metadata']['visualisations'];
      }
      this.activateSpinner = false;

      // Reload if interval is set
      if (this._refreshInterval > 0) {
        clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.loadResources();
        }, this._refreshInterval * 1000);
      }

    }).catch((response) => {
      alert("Couldn't connect to the backend API. Please refresh this page.");
    });
  }

  loadFilters() {
    this.activateSpinner = true;
    return this.resourceService.getResources({filters_only: true}).then((response) => {
      this._disabled = response['response']['metadata']['disabled'] ? response['response']['metadata']['disabled'] : false;
      let filters = response['response']['metadata']['filters'];
      if (!filters) {
        filters = {};
      }
      this._filters = filters;
      this._filtersFormGroup = this.formBuilder.group(Object.keys(filters).reduce((acc, value) => {
        acc[value] = this._filters[value]['value'];
        return acc;
      }, {}));
      this._filtersFormComponents = Object.keys(filters).reduce((acc, value) => {
        acc.push({
          name: value,
          label: this._filters[value]['label'],
          type: this._filters[value]['type'],
          initial_value: this._filters[value]['initial_value'],
          options: this._filters[value]['options']
        });
        return acc;
      }, []);

      this.activateSpinner = false;
    }).catch((response) => {
      alert("Couldn't connect to the backend API. Please refresh this page.");
    });
  }

  setApiEndpoint(apiUrl, defaultQuery) {
    this.resourceService.setApiEndpoint(apiUrl, this.apiIndexUri);
    this.resourceService.setDefaultQuery(defaultQuery);
  }


  @Input()
  set displayedColumns(displayedColumns: string[]) {
    this._displayedColumns = displayedColumns;
  }

  @Input()
  set enableFilters(enableFilters: boolean) {
    this._enableFilters = enableFilters;
  }

  @Input()
  set enableExcelDownload(enableExcelDownload: boolean) {
    this._enableExcelDownload = enableExcelDownload;
  }

  @Input()
  set rowClasses(rowClasses: string[]) {
    this._rowClasses = rowClasses;
  }

  @Input()
  set refreshInterval(refreshInterval: number) {
    this._refreshInterval = refreshInterval;
  }

  get resources(): any[] {
    return this._resources;
  }

  get visualisations(): any[] {
    return this._visualisations;
  }

  get rowClasses() {
    return this._rowClasses ? this._rowClasses : [];
  }

  get displayedColumns(): string[] {
    if (this._displayedColumns == null) {
      if (this.resources && this.resources.length > 0) {
        return Object.keys(this.resources[0]);
      } else {
        return [];
      }
    } else {
      return this._displayedColumns;
    }
  }

  resourceClicked(resource: any) {
    if (this.enableShow) {
      this.router.navigateByUrl(this.resourceShowUri.replace(':id', resource.id));
    }
  }


  resetFilters() {
    this._filtersFormComponents.forEach((c) => {
      this._filtersFormGroup.patchValue(JSON.parse(`{
       "${c.name}": "${c.initial_value}"
     }`));
    });
    this.loadResources();
  }

  filterKeyup(event) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.loadResources();
    }
  }

  downloadExcel() {
    this.activateSpinner = true;
    this.resourceService.getResources(this._filtersFormGroup.value, 'xlsx').then((response) => {

      console.log('test');
      this._downloadExcelURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));

      setTimeout(() => {
        console.log('timeout');
        let element: HTMLElement = document.getElementById('downloadExcelLink') as HTMLElement;
        element.click();
      }, 100);

      console.log('done');


      this.activateSpinner = false;
    }).catch((response) => {
      alert("Couldn't connect to the backend API. Please refresh this page.");
    });
  }

  newResource() {
    this.router.navigateByUrl(this.resourceNewUri);
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2500});
  }

  debugOutput(obj) {
    console.log(obj);
  }

  assignClasses(row) {
    if (this.rowClasses) {
      let classes = [];
      for(let field of this.rowClasses) {
        classes.push(row[field]);
      }
      return classes.join(' ');
    }
    return '';
  }

}
