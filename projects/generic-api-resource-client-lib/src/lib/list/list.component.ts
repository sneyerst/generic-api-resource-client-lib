import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ListService} from "./list.service";
import {GenericApiResource} from "../generic-api-resource";
import {FilesService} from '../files/files.service';
import {ResourceService} from "../services/resource.service";

@Component({
  selector: 'generic-api-resource-list',
  templateUrl: 'list.component.html',
  styleUrls: [],
  providers: [ResourceService, FilesService]
})
export class ListComponent extends GenericApiResource implements OnDestroy {

  _enableFilters: boolean = false;

  _enableExcelDownload: boolean = false;
  _downloadExcelURL;

  _resources: any[] = [];
  _displayedColumns: string[];

  _filters;
  _visualisations: any[] = [];

  _apiUrl = null;
  _filtersFormGroup: FormGroup;
  _filtersFormComponents: any[];
  _apiUrlSubscription: Subscription;


  constructor(private resourceService: ResourceService, private router: Router, private sanitizer: DomSanitizer, private filesService: FilesService, private formBuilder: FormBuilder) {
    super();
    this._apiUrlSubscription = this.apiUrlObservable.subscribe((apiUrl: string) => {
      this._apiUrl = apiUrl;
      this.setApiEndpoint(apiUrl, this.defaultQuery);
    });
    this.resourceNameSingularChanged.subscribe((resourceNameSingular: string) => {
      this.setApiEndpoint(this._apiUrl, this.defaultQuery);
    });
  }

  ngOnDestroy(): void {
    this._apiUrlSubscription.unsubscribe();
    this.resourceNameSingularChanged.unsubscribe();
  }

  initComponent() {
    this.loadData();
  }

  loadData() {
    this.activateSpinner = true;
    this.resourceService.getResources().then((response) => {
      this._resources = response['response']['data'];
      this._visualisations = response['response']['metadata']['visualisations'];

      const filters = response['response']['metadata']['filters'];
      const resetFilters = JSON.stringify(this._filters) == undefined || JSON.stringify(this._filters) == JSON.stringify({});
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
      if (resetFilters) {
        this.resetFilters();
      }
      this.activateSpinner = false;
    });
  }

  setApiEndpoint(apiUrl, defaultQuery) {
    this.resourceService.setApiEndpoint(apiUrl, this.apiIndexUri);
    this.resourceService.setDefaultQuery(defaultQuery);

    if (apiUrl && defaultQuery && this.resourceNameSingular) {
      this.initComponent();
    }
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

  get resources(): any[] {
    return this._resources;
  }

  get visualisations(): any[] {
    return this._visualisations;
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

  loadResources() {
    //this.resourceService.getResources(this._filtersFormGroup['value']);
    this.resourceService.getResources();
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

  // downloadExcel() {
  //   const url = this.resourceService.getApiEndpointUrl(this._filtersFormGroup['value'], 'xlsx')
  //
  //   this.filesService.download(url).subscribe((data: any) => {
  //     this._downloadExcelURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));
  //
  //     setTimeout(() => {
  //       let element: HTMLElement = document.getElementById('downloadExcelLink') as HTMLElement;
  //       element.click();
  //     }, 100);
  //   });
  // }

  newResource() {
    this.router.navigateByUrl(this.resourceNewUri);
  }

}
