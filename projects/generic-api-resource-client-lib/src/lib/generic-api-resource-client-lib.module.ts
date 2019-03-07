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

@NgModule({
  declarations: [
    FormComponent,
    ListComponent
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
