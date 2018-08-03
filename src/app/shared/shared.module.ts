import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NotFoundComponent }      from '@app/shared/not-found/not-found.component';
import { HeaderComponent }        from '@app/shared/header/header.component';
import { FooterComponent }        from '@app/shared/footer/footer.component';
import { ConfirmDialogComponent } from '@app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { NavbarComponent }        from '@shared/nav/navbar.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule
    ],
    exports: [
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
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        ConfirmDialogComponent
    ],

    declarations: [
        NotFoundComponent,
        NavbarComponent,
        HeaderComponent,
        FooterComponent,
        ConfirmDialogComponent,

    ]
})
export class SharedModule { }
