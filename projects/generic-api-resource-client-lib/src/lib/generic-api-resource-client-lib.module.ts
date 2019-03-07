import {NgModule} from '@angular/core';
import {NewComponent} from "./new/new.component";
import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./detail/detail.component";
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

@NgModule({
  declarations: [
    NewComponent,
    EditComponent,
    ListComponent,
    DetailComponent
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
    NewComponent,
    EditComponent,
    ListComponent,
    DetailComponent
  ]
})
export class GenericApiResourceClientLibModule {
}
