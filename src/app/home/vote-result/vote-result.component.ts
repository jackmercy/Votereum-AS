import { Component, OnInit } from '@angular/core';

import { UserService }       from '@services/user.service';
import { BallotService }   from '@services/ballot.service';
import { MatSnackBar }       from '@angular/material';
import { timestamp } from 'rxjs/operators';

@Component({
    selector: 'app-vote-result',
    templateUrl: './vote-result.component.html',
    styleUrls: ['./vote-result.component.scss']
})
export class VoteResultComponent implements OnInit {
    txReceipt: Object = {
        transactionHash: '',
        status: '',
        timestamp: ''
    };
    listenCondition: any;
    txResultText: string;
    txHash: string;

    constructor(private _userService: UserService,
                private _ballotService: BallotService,
                public snackBar: MatSnackBar) { }

    ngOnInit() {
        const citizenId = this._userService.getId();
        this._userService.getUserHash(citizenId).subscribe(
            txHash => {
                this.txHash = txHash['hash'];
                this.onGetStatus(this.txHash);
                this.listenCondition = setInterval(() => this.onGetStatus(this.txHash), 12000);
            }
        );
    }

    private onGetStatus(txHash: string) {
        this._ballotService.getTxReceipt(txHash)
            .subscribe(
                data => {
                    this.txReceipt = {...data};
                    /* console.log(this.txReceipt); */
                    const statusVal = data['status'];
                    if (statusVal === true) {
                        this.txReceipt['status'] = 'Success';
                        this.txResultText = 'Transaction successful';
                        clearInterval(this.listenCondition);
                    } else if (statusVal === false) {
                        this.txReceipt['status'] = 'Failure';
                        this.txResultText = 'Transaction Failed';
                        clearInterval(this.listenCondition);
                    } else {
                        this.txResultText = 'Pending Confirmation';
                    }
                },
                error => {
                    const msg = error.error.message;
                    this.snackBar.open(msg , 'Got it', {
                        duration: 3000,
                    });
                }
        );
    }

    onTxDetailClicked() {
        window.open(`https://rinkeby.etherscan.io/tx/${this.txHash}`, '_blank');
    }
}
