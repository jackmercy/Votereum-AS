import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master/master.component';
/* Modules */
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { VotingComponent } from './voting/voting.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { CandidateComponent } from './candidate/candidate.component';
import { VoteResultComponent } from './vote-result/vote-result.component';
@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SharedModule
    ],
    exports: [MasterComponent],
    declarations: [
        MasterComponent,
        VotingComponent,
        ScoreBoardComponent,
        CandidateComponent,
        VoteResultComponent
    ]
})
export class HomeModule { }
