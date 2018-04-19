import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
/* Guard */
import { AuthGuard } from './core/guards/auth.guard';
import { VotedGuard } from './core/guards/voted.guard';
/* Core/Shared */
import { NotFoundComponent } from './shared/components/not-found.component';
/* Public */
import { PublicComponent } from './public/components/public.component';
import { LoginComponent } from './public/components/login.component';
import { RegisterComponent } from './public/components/register.component';
/* Home */
import { HomeComponent } from './home/components/home.component';
import { GuideComponent } from './home/components/guide.component';
import { VotingComponent } from './home/components/voting.component';
import { ScoreBoardComponent } from './home/components/score-board.component';
import { VoteResultComponent } from './home/components/vote-result.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: PublicComponent,
                children: [
                    {
                        path: '', component: LoginComponent
                    },
                    {
                        path: 'register', component: RegisterComponent
                    }
                ]
            },
            {
                path: 'home', canActivate: [AuthGuard], component: HomeComponent,
                children: [
                    {
                        path: 'guides', component: GuideComponent
                    },
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

