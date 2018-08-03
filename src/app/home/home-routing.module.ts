import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { HomeMasterComponent }     from './master/master.component';
import { VotingComponent }     from './voting/voting.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { VoteResultComponent } from './vote-result/vote-result.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeMasterComponent,
        children: [
            { path: '', redirectTo: '/home/voting', pathMatch: 'full'},
            { path: 'voting', /* canActivate: [VotedGuard], */ component: VotingComponent },
            { path: 'score-board', component: ScoreBoardComponent },
            { path: 'vote-result', component: VoteResultComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(homeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule {}
