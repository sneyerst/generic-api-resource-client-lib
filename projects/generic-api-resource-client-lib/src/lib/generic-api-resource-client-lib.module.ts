import {NgModule} from '@angular/core';
import {NewComponent} from "./new/new.component";
import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";
import {DetailComponent} from "./detail/detail.component";

@NgModule({
  declarations: [
    NewComponent,
    EditComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
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
