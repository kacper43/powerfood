import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,
  MatDividerModule, MatListModule, MatTableModule, MatCheckboxModule, MatToolbarModule,
  MatIconModule, MatBadgeModule, MatTabsModule, MatCardModule, MatExpansionModule, MatTooltipModule} from '@angular/material';
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
    MatTooltipModule
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
    MatTooltipModule
  ]
})
export class MaterialModule {}
