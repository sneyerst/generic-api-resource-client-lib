import {NgModule} from '@angular/core';
import {ListComponent} from "./list/list.component";
import {MomentModule} from "ngx-moment";
import {ReactiveFormsModule} from "@angular/forms";
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatTableModule
} from "@angular/material";
import {CommonModule} from "@angular/common";
import {FormComponent} from "./form/form.component";
import {AccordionComponent} from "./fields/accordion.component";
import {CheckboxComponent} from "./fields/checkbox.component";
import {DropdownComponent} from "./fields/dropdown.component";
import {FilesComponent} from "./fields/files.component";
import {TextareaComponent} from "./fields/textarea.component";
import {TextfieldComponent} from "./fields/textfield.component";
import {TableComponent} from "./fields/table.component";

@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    AccordionComponent,
    CheckboxComponent,
    DropdownComponent,
    FilesComponent,
    TextareaComponent,
    TextfieldComponent,
    TableComponent
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
    MatCardModule
  ],
  exports: [
    ListComponent,
    FormComponent
  ]
})
export class GenericApiResourceClientLibModule {
}
