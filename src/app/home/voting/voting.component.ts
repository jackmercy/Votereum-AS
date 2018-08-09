import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { CandidateService }  from '@services/candidate.service';
import { UserService }       from '@services/user.service';
import { ContractService }   from '@services/contract.service';
import { MatSnackBar }       from '@angular/material';
@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    mock_candidates: Array<Object> = [
        {
            'id': '1120',
            'title': 'ms',
            'firstName': 'dana',
            'lastName': 'walters',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/2/26/MacCollins.JPG',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1125',
            'title': 'mr',
            'firstName': 'wallace',
            'lastName': 'jensen',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'When you reach the end of your rope, tie a knot in it and hang on.'
        },
        {
            'id': '1130',
            'title': 'mr',
            'firstName': 'edward',
            'lastName': 'wilson',
            'picture': 'https://images.wisegeek.com/man-in-gray-suit.jpg',
            'quote': 'There is nothing permanent except change.'
        },
        {
            'id': '1135',
            'title': 'mr',
            'firstName': 'mathew',
            'lastName': 'andrews',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1140',
            'title': 'mrs',
            'firstName': 'danielle',
            'lastName': 'webb',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jim_Marshall.jpg/220px-Jim_Marshall.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1145',
            'title': 'ms',
            'firstName': 'harper',
            'lastName': 'mitchell',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1150',
            'title': 'miss',
            'firstName': 'celina',
            'lastName': 'johnson',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'Let us sacrifice our today so that our children can have a better tomorrow.'
        },
        {
            'id': '1155',
            'title': 'miss',
            'firstName': 'susan',
            'lastName': 'ruiz',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'There is no charm equal to tenderness of heart.'
        },
        {
            'id': '1160',
            'title': 'miss',
            'firstName': 'delores',
            'lastName': 'morrison',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'There is no charm equal to tenderness of heart.'
        },
        {
            'id': '1165',
            'title': 'miss',
            'firstName': 'addison',
            'lastName': 'shelton',
            'picture': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Bill_Huizenga,_Official_Portrait,_112th_Congress.jpg',
            'quote': 'There is no charm equal to tenderness of heart.'
        }
    ];
    candidates: Array<Object>;
    constructor(private _candidateService: CandidateService,
                private _userService: UserService,
                private _contractService: ContractService,
                private _router: Router,
                public snackBar: MatSnackBar) { }

    voting_result = {
        candidates: [],
        citizenID: ''
    };

    ngOnInit() {
/*        this._candidateService.getCandidates()
            .subscribe(
                data => {
                    this.candidates = data;
                },
                error => {
                    console.log(error);
                }
            );*/

        this.candidates = this.mock_candidates.map(candidate => {
            candidate['isSelected'] = false;
            return candidate;
        });

        this.voting_result.citizenID =  this._userService.getId();
    }

    onVoted(result: Object) {
        if (result['voted'] === true) {
            this.voting_result.candidates.push(result['candidateID']);
            console.log(this.voting_result);
        } else if (result['voted'] === false) {
            const index = this.voting_result.candidates.indexOf(result['candidateID']);
            if (index > -1) {
                this.voting_result.candidates.splice(index, 1);
            }
            console.log(this.voting_result);
        }
    }

    onVoteToBlockchain() {
        /* Do check the list candidates is equal 4 or not */
        if (this.voting_result.candidates.length > 4 && this.voting_result.candidates.length <= 6) {
            this.snackBar.open('The maximum candidates you can vote for are 4 out of 6' , 'Got it', {
                duration: 30000,
            });
        } else if (this.voting_result.candidates.length <= 4 ) {
           this._contractService.votingBlock(this.voting_result)
            .subscribe( result => {
                if (result.hash) {
                    this._userService.updateUserHash(result.hash);
                    this._userService.updateUserVote(result.isVote);
                    this._router.navigate(['/home/vote-result']);
                } else if (result.message) {
                    this.snackBar.open(result.message , 'OK', {
                        duration: 30000,
                    });
                }
            });
        }
    }

    toggleItemSelection(item: Object) {
        item['isSelected'] = !item['isSelected'];
    }

    onCandidateSelected(candidate: Object) {
        this.toggleItemSelection(candidate);
    }
}
