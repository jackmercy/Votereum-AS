import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule
} from '@angular/material';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatMenuModule,
        MatGridListModule,
        MatDividerModule,

        NotFoundComponent,
        ConfirmDialogComponent
    ],

    declarations: [
        NotFoundComponent,
        HeaderComponent,
        FooterComponent,
        ConfirmDialogComponent
    ]
})
export class SharedModule { }
