import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }  from '@angular/forms';
/* Modules */
import { SharedModule }      from '@app/shared/shared.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';

/* Components */
import { HomeMasterComponent } from './master/master.component';
import { VotingComponent }     from './voting/voting.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { VoteResultComponent } from './vote-result/vote-result.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,

        SharedModule,
        HomeRoutingModule,

    ],
    exports: [],
    declarations: [
        HomeMasterComponent,
        VotingComponent,
        ScoreBoardComponent,
        VoteResultComponent
    ]
})
export class HomeModule { }
