import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from '@app/home/master/master.component';
/* Modules */
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { VotingComponent } from '@app/home/voting/voting.component';
import { ScoreBoardComponent } from '@app/home/score-board/score-board.component';
import { CandidateComponent } from '@app/home/candidate/candidate.component';
import { VoteResultComponent } from '@app/home/vote-result/vote-result.component';
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
