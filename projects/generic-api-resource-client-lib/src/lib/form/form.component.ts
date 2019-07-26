import {Component, Input} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GenericApiResource} from "../generic-api-resource";
import {ResourceService} from "../services/resource.service";


@Component({
  selector: 'generic-api-resource-form',
  templateUrl: 'form.component.html',
  styleUrls: [],
  providers: [ResourceService]
})
export class FormComponent extends GenericApiResource {

  _resourceId: number;

  _displayedFields: string[];

  _resourceFormGroup: FormGroup;
  _resourceFormComponents: any[];

  _apiUrlSubscription: Subscription;

  _resource: any;
  _fields: any;
  _values: any;

  constructor(private resourceService: ResourceService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    super();
    this._apiUrlSubscription = this.apiUrlObservable.subscribe((apiUrl: string) => {
      this.setApiEndpoint(apiUrl, this._resourceId);
    });
  }

  initComponent() {
    this.loadData();
  }

  loadData() {
    this.activateSpinner = true;
      this.resourceService.getResource().then((response) => {
        this._resource = response['response']['data'];
        this._fields = response['response']['metadata']['fields'];
        this._values = response['response']['metadata']['values'];
        this._resourceFormGroup = (this.parseFormGroup(this._values));
        this._resourceFormComponents = Object.keys(this._fields).reduce((acc, value) => {
          acc.push({
            name: value,
            label: this._fields[value]['label'],
            type: this._fields[value]['type'],
            options: this._fields[value]['options'],
            children: this._fields[value]['children'],
            fields: this._fields[value]['fields'],
            trigger: this._fields[value]['trigger'],
            new: this._fields[value]['new'],
            upload_url: this._fields[value]['upload_url']
          });
          return acc;
        }, []);
        this.activateSpinner = false;
      }
    )
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
    this.setApiEndpoint(this.apiUrl, resourceId);
  }

  @Input()
  set displayedFields(displayedFields: string[]) {
    this._displayedFields = displayedFields;
  }

  get displayedFields(): string[] {
    return this._displayedFields;
  }

  get resource() {
    return this._resource;
  }

  get isNew(): boolean {
    return this._resourceId == null || isNaN(this._resourceId);
  }

  getResourceAttributes() {
    return JSON.parse(`{"${this.apiNameSingular}":${JSON.stringify(this._resourceFormGroup['value'])}}`);
  }


  cancelButtonClicked() {
    this.router.navigateByUrl(this.resourceIndexUri);
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 2500});
  }

  getFormArray(formGroup, name): FormArray {
    return formGroup.get(name);
  }

  setApiEndpoint(apiUrl, resourceId) {
    if (apiUrl && resourceId) {
      this.resourceService.setApiEndpoint(apiUrl, this.apiIndexUri, this.apiShowUri.replace(':id', resourceId.toString()));
      this.initComponent();
    }
  }

  createResource() {
    this.activateSpinner = true;
    this.resourceService.createResource(this.getResourceAttributes()).then(
      (response) => {
        this.router.navigateByUrl(this.resourceIndexUri);
        this.showSnackBar("Your changes have been updated.", 'Ok');
        this.activateSpinner = false;
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

  updateResource() {
    this.activateSpinner = true;
    this.resourceService.updateResource(this.getResourceAttributes()).then(
      (response) => {
        this.router.navigateByUrl(this.resourceIndexUri);
        this.showSnackBar("Your changes have been updated.", 'Ok');
        this.activateSpinner = false;
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
      this.activateSpinner = true;
      this.resourceService.deleteResource().then(
        (response) => {
          this.router.navigateByUrl(this.resourceIndexUri);
          this.showSnackBar("Item has been deleted.", 'Ok');
          this.activateSpinner = false;
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

}
