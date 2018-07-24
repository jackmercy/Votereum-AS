import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
/* Guard */
import { AuthGuard } from '@app/core/guards/auth.guard';
import { VotedGuard } from '@app/core/guards/voted.guard';
/* Core/Shared */
import { NotFoundComponent } from '@app/shared/not-found/not-found.component';
/* Public */
import { MasterPublicComponent } from '@app/public/master-public/master-public.component';
import { LoginComponent } from '@app/public/login/login.component';
/* Home */
import { MasterComponent } from '@app/home/master/master.component';
import { VotingComponent } from '@app/home/voting/voting.component';
import { ScoreBoardComponent } from '@app/home/score-board/score-board.component';
import { VoteResultComponent } from '@app/home/vote-result/vote-result.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: MasterPublicComponent,
                children: [
                    {
                        path: '', component: LoginComponent
                    }
                ]
            },
            {
                path: 'home', canActivate: [AuthGuard], component: MasterComponent,
                children: [
                    {
                        path: 'voting', canActivate: [VotedGuard], component: VotingComponent
                    },
                    {
                        path: 'score-board', component: ScoreBoardComponent
                    },
                    {
                        path: 'vote-result', component: VoteResultComponent
                    }
                ]
            },
            {
                path: '**', component: NotFoundComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutes { }

