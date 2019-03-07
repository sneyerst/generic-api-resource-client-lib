import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {DetailService} from "../detail/detail.service";
import {GenericApiResource} from "../generic-api-resource";


@Component({
  selector: 'generic-api-resource-edit',
  templateUrl: 'edit.component.html',
  styleUrls: [],
  providers: [DetailService]
})
export class EditComponent extends GenericApiResource {

  _resourceId: number;
  _displayedFields: string[];

  _resourceFormGroup: FormGroup;
  _resourceFormComponents: any[];

  _fieldsSubscription: Subscription;
  _fields: any;
  _resourceSubscription: Subscription;
  _resource: any;
  _valuesSubscription: Subscription;
  _values: any;
  _apiUrlSubscription: Subscription;

  constructor(private apiDetailService: DetailService, private router: Router, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this._apiUrlSubscription = this.apiUrlObservable.subscribe((apiUrl: string) => {
      this.apiDetailService.setApiEndpoint(apiUrl, this.resourceIndexUri);
    });
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
  }

  ngOnDestroy(): void {
    this._resourceSubscription.unsubscribe();
    this._valuesSubscription.unsubscribe();
    this._fieldsSubscription.unsubscribe();
    this._apiUrlSubscription.unsubscribe();
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
  set displayedFields(displayedFields: string[]) {
    this._displayedFields = displayedFields;
  }

  get displayedFields(): string[] {
    return this._displayedFields;
  }

  get resource() {
    return this._resource;
  }

  getResourceAttributes() {
    return JSON.parse(`{"${this.resourceNameSingular}":${JSON.stringify(this._resourceFormGroup['value'])}}`);
  }


  cancelButtonClicked() {
    this.router.navigateByUrl(this.resourceIndexUri);
  }

  updateResource() {
    this.apiDetailService.updateResource(this.getResourceAttributes()).then(
      (response) => {
        this.router.navigateByUrl(this.resourceIndexUri);
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
          this.router.navigateByUrl(this.resourceIndexUri);
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

  getFormArray(formGroup, name): FormArray {
    return formGroup.get(name);
  }

}
