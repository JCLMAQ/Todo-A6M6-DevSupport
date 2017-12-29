import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSortModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatSidenavModule,
  BrowserAnimationsModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSortModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule { }
