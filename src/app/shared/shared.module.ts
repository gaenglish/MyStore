import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import {RouterModule} from '@angular/router';
import {MatDatepickerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatStepperModule,
    MatExpansionModule,
    MatTreeModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSliderModule,
    MatBadgeModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatDividerModule,
    MatDialogModule,
  ],
  declarations: [ToolbarComponent, AddToCartComponent],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTreeModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSliderModule,
    MatBadgeModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatDialogModule,
    ToolbarComponent,
    AddToCartComponent
  ],
  entryComponents: []
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {} }
        // { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
      ]
    };
  }
}
