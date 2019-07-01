import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {MomentModule} from 'ngx-moment';
import {ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {FormComponent} from './form/form.component';
import {AccordionComponent} from './fields/accordion.component';
import {CheckboxComponent} from './fields/checkbox.component';
import {DropdownComponent} from './fields/dropdown.component';
import {FilesComponent} from './fields/files.component';
import {TextareaComponent} from './fields/textarea.component';
import {TextfieldComponent} from './fields/textfield.component';
import {TableComponent} from './fields/table.component';
import {FileComponent} from './fields/file.component';
import {ChipsComponent} from './visualisations/chips.component';
import {LinkButtonsComponent} from './visualisations/link-buttons.component';
import {HiddenFieldComponent} from "./fields/hidden_field.component";
import {DropdownMultiselectComponent} from "./fields/dropdown_multiselect.component";
import {UploadModule} from "./upload/upload.module";
import {FilesAsyncComponent} from "./fields/files_async.component";
import {UploadComponent} from "./upload/upload.component";

@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    AccordionComponent,
    CheckboxComponent,
    DropdownComponent,
    DropdownMultiselectComponent,
    FileComponent,
    FilesComponent,
    HiddenFieldComponent,
    TextareaComponent,
    TextfieldComponent,
    TableComponent,
    ChipsComponent,
    LinkButtonsComponent,
    FilesAsyncComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MomentModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    UploadModule
  ],
  exports: [
    ListComponent,
    FormComponent,
    UploadComponent
  ]
})
export class GenericApiResourceClientLibModule {
}
