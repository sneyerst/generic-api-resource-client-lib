import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ListService} from "./list.service";
import {GenericApiResource} from "../generic-api-resource";
import {FilesService} from '../files/files.service';

@Component({
  selector: 'generic-api-resource-list',
  templateUrl: 'list.component.html',
  styleUrls: [],
  providers: [ListService, FilesService]
})
export class ListComponent extends GenericApiResource implements OnInit, OnDestroy {


  _enableFilters: boolean = false;

  _enableExcelDownload: boolean = false;
  _downloadExcelURL;

  _resources: any[] = [];
  _resourcesSubscription: Subscription;
  _displayedColumns: string[];

  _filters;
  _filtersFormGroup: FormGroup;
  _filtersFormComponents: any[];
  _filtersSubscription: Subscription;
  _apiUrlSubscription: Subscription;

  _visualisations: any[] = [];
  _visualisationsSubscription: Subscription;

  constructor(
    private apiListService: ListService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private filesService: FilesService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this._apiUrlSubscription = this.apiUrlObservable.subscribe((apiUrl: string) => {
      this.apiListService.setApiEndpoint(apiUrl, this.apiIndexUri, this.defaultQuery);
    });
    this._resourcesSubscription = this.apiListService.resourcesObservable.subscribe((resources: any[]) => this._resources = resources);
    this._visualisationsSubscription = this.apiListService.visualisationsObservable.subscribe((visualisations: any[]) => this._visualisations = visualisations);
    this._filtersSubscription = this.apiListService.filtersObservable.subscribe((filters) => {
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
      }
    );
  }

  ngOnDestroy(): void {
    this._resourcesSubscription.unsubscribe();
    this._filtersSubscription.unsubscribe();
    this._apiUrlSubscription.unsubscribe();
    this._visualisationsSubscription.unsubscribe();
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
    console.log(this._filtersFormGroup['value']);
    this.apiListService.getResources(this._filtersFormGroup['value']);
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
    const url = this.apiListService.getApiEndpointUrl(this._filtersFormGroup['value'], 'xlsx')

    this.filesService.download(url).subscribe((data: any) => {
      this._downloadExcelURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(data));

      setTimeout(() => {
        let element: HTMLElement = document.getElementById('downloadExcelLink') as HTMLElement;
        element.click();
      }, 100);
    });
  }

  newResource() {
    this.router.navigateByUrl(this.resourceNewUri);
  }

}
