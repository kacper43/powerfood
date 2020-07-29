import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatDividerModule, MatListModule, MatTableModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatBadgeModule, MatTabsModule} from '@angular/material';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
