import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './../material/material.module';
import { TableActionsComponent } from './components/table-actions/table-actions.component';
import { TableComponent } from './components/table/table.component';

const sharedComponents = [TableComponent, TableActionsComponent];

@NgModule({
  declarations: [sharedComponents],
  exports: [sharedComponents],
  imports: [CommonModule, MaterialModule],
})
export class SharedModule {}
