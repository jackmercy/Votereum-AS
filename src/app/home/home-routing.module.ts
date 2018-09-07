import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { HomeMasterComponent }     from './master/master.component';
import { VotingComponent }         from './voting/voting.component';
import { ScoreBoardComponent }     from './score-board/score-board.component';
import { VoteResultComponent }     from './vote-result/vote-result.component';
import { UnauthorizedComponent }   from '@shared/unauthorized/unauthorized.component';
/* Guard */
import { VotedGuard }   from '@app/core/guards/voted.guard';
import { CitizenGuard } from '@app/core/guards/citizen.guard';

const homeRoutes: Routes = [
    {
        path: '',
        canActivate: [CitizenGuard],
        component: HomeMasterComponent,
        children: [
            { path: '', redirectTo: '/home/voting', pathMatch: 'full'},
            { path: 'voting', canActivate: [VotedGuard], component: VotingComponent },
            { path: 'score-board', component: ScoreBoardComponent },
            { path: 'vote-result', component: VoteResultComponent },
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
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
