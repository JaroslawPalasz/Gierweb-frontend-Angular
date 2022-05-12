import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips'
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatCardModule,
        MatPaginatorModule,
        MatGridListModule,
        MatDividerModule,
        MatChipsModule,
        MatTableModule,
        MatListModule,
        MatSortModule,
        MatCheckboxModule,
        MatDialogModule,
    ],
    exports: [
        MatSliderModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatCardModule,
        MatPaginatorModule,
        MatGridListModule,
        MatDividerModule,
        MatChipsModule,
        MatTableModule,
        MatListModule,
        MatSortModule,
        MatCheckboxModule,
        MatDialogModule,
    ],
  })
  export class MaterialModule {}