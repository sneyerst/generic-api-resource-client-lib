import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DetailService} from "../detail/detail.service";


@Component({
  selector: 'generic-api-resource-edit',
  templateUrl: 'edit.component.html',
  styleUrls: [],
  providers: [DetailService]
})
export class EditComponent {

  private _resourceId: number;
  private _resourceNameSingular: string;
  private _resourceNamePlural: string;
  private _apiEndpointUri: string;
  private _pageTitle: string;
  private _displayedFields: string[];
  private _displayTitle: boolean = false;
  private _resourcesListUri: string;

  protected _resourceFormGroup: FormGroup;
  protected _resourceFormComponents: any[];

  private _fieldsSubscription: Subscription;
  private _fields: any;
  private _resourceSubscription: Subscription;
  private _resource: any;
  private _valuesSubscription: Subscription;
  private _values: any;

  constructor(private apiDetailService: DetailService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._resourceSubscription = this.apiDetailService.resourceObservable.subscribe((resource: any) => this._resource = resource);
    this._valuesSubscription = this.apiDetailService.valuesObservable.subscribe((values: any) => {
        this._values = values;
        this._resourceFormGroup = (this.parseFormGroup(values));
      }
    );
    this._fieldsSubscription = this.apiDetailService.fieldsObservable.subscribe((fields: any) => {
      this._fields = fields;
      this._resourceFormComponents = Object.keys(fields).reduce((acc, value) => {
        acc.push({
          name: value,
          label: fields[value]['label'],
          type: fields[value]['type'],
          options: fields[value]['options'],
          children: fields[value]['children'],
          fields: fields[value]['fields'],
          trigger: fields[value]['trigger']
        });
        return acc;
      }, []);
    });

    this.apiDetailService.setApiEndpoint(this.apiEndpointUri);
  }

  ngOnDestroy(): void {
    this._resourceSubscription.unsubscribe();
    this._valuesSubscription.unsubscribe();
    this._fieldsSubscription.unsubscribe();
  }

  parseFormGroup(formGroupInput) {
    let formGroup = {};
    for (let key of Object.keys(formGroupInput)) {
      switch (formGroupInput[key]['type']) {
        case 'form-control': {
          formGroup[key] = formGroupInput[key]['value'];
          break;
        }
        case 'form-array': {
          formGroup[key] = this.parseFormArray(formGroupInput[key]['value']);
          break;
        }
        case 'form-group': {
          formGroup[key] = this.parseFormGroup(formGroupInput[key]['value']);
          break;
        }
      }
    }
    return this.formBuilder.group(formGroup);
  }

  parseFormArray(formArrayInput) {
    let formArray = [];
    for (let i = 0; i < formArrayInput.length; i++) {
      switch (formArrayInput[i]['type']) {
        case 'form-control': {
          formArray[i] = formArrayInput[i]['value'];
          break;
        }
        case 'form-array': {
          formArray[i] = this.parseFormArray(formArrayInput[i]['value']);
          break;
        }
        case 'form-group': {
          formArray[i] = this.parseFormGroup(formArrayInput[i]['value']);
          break;
        }
      }
    }
    return this.formBuilder.array(formArray);
  }

  @Input()
  set resourceId(resourceId: number) {
    this._resourceId = resourceId;
  }

  @Input()
  set resourceNameSingular(resourceNameSingular: string) {
    this._resourceNameSingular = resourceNameSingular;
  }

  @Input()
  set resourceNamePlural(resourceNamePlural: string) {
    this._resourceNamePlural = resourceNamePlural;
  }

  @Input()
  set pageTitle(pageTitle: string) {
    this._pageTitle = pageTitle;
  }

  @Input()
  set apiEndpointUri(apiEndpointUri: string) {
    this._apiEndpointUri = apiEndpointUri;
  }

  @Input()
  set resourcesListUri(resourcesListUri: string) {
    this._resourcesListUri = resourcesListUri;
  }

  @Input()
  set displayTitle(displayTitle: boolean) {
    this._displayTitle = displayTitle;
  }

  @Input()
  set displayedFields(displayedFields: string[]) {
    this._displayedFields = displayedFields;
  }

  get displayedFields(): string[] {
    return this._displayedFields;
  }

  get resourceNameSingular(): string {
    return this._resourceNameSingular;
  }

  get resourceNamePlural(): string {
    if (this._resourceNamePlural == null) {
      return this._resourceNameSingular + 's';
    } else {
      return this._resourceNamePlural;
    }
  }

  get apiEndpointUri(): string {
    if (this._apiEndpointUri == null) {
      return `/${this.resourceNamePlural}/${this._resourceId}`;
    } else {
      return this._apiEndpointUri.replace(':id', ('' + this._resourceId));
    }
  }

  get pageTitle(): string {
    if (this._pageTitle == null) {
      return this.pageTitle = this.resourceNameSingular.charAt(0).toUpperCase() + this.resourceNameSingular.slice(1) + ' #' + this._resourceId;
    } else {
      return this._pageTitle;
    }
  }

  get resourcesListUri(): string {
    if (this._resourcesListUri == null) {
      return `/${this.resourceNamePlural}`;
    } else {
      return this._resourcesListUri;
    }
  }

  get resource() {
    return this._resource;
  }

  get displayTitle() {
    return this._displayTitle;
  }

  getResourceAttributes() {
    return JSON.parse(`{"${this.resourceNameSingular}":${JSON.stringify(this._resourceFormGroup['value'])}}`);
  }


  cancelButtonClicked() {
    this.router.navigateByUrl(this.resourcesListUri);
  }

  updateResource() {
    this.apiDetailService.updateResource(this.getResourceAttributes()).then(
      (response) => {
        this.router.navigateByUrl(this.resourcesListUri);
        this.showSnackBar("Your changes have been updated.", 'Ok');
      },
      (response) => {
        switch (response.status) {
          case 403: {
            this.showSnackBar("You do not have permission for this action.", 'Ok');
            break;
          }
          case 422: {
            this.showSnackBar("Couldn't save your changes because of validation errors.", 'Ok');
            break;
          }
          default: {
            this.showSnackBar("An error occured. Couldn't save your changes.", 'Ok');
            break;
          }
        }
      }
    );
  }

  deleteResource() {
    if (confirm('Are you sure? This action is irreversible!')) {
      this.apiDetailService.deleteResource().then(
        (response) => {
          this.router.navigateByUrl(this.resourcesListUri);
          this.showSnackBar("Item has been deleted.", 'Ok');
        },
        (response) => {
          switch (response.status) {
            case 403: {
              this.showSnackBar("You do not have permission for this action.", 'Ok');
              break;
            }
            default: {
              this.showSnackBar("An error occured. Couldn't delete this item.", 'Ok');
              break;
            }
          }
        }
      );
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2500});
  }

}
