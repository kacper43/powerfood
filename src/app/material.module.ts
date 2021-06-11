import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatDividerModule, MatListModule, MatTableModule, MatCheckboxModule, MatToolbarModule,
  MatIconModule, MatBadgeModule, MatTabsModule, MatCardModule, MatExpansionModule, MatTooltipModule,
  MatSnackBarModule} from '@angular/material';
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
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule
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
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class MaterialModule {}
