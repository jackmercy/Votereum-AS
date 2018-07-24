import { Component, OnInit } from '@angular/core';

import { CoreService } from '@app/core/services/core.service';
import { UserService } from '@app/core/services/user.service';


@Component({
    selector: 'app-vote-result',
    templateUrl: './vote-result.component.html',
    styleUrls: ['./vote-result.component.scss']
})
export class VoteResultComponent implements OnInit {
    txReceipt: any;
    blockDetail: any;
    txHash: any;
    listenCondition: any;

    constructor(private _coreService: CoreService,
                private _userService: UserService) { }

    ngOnInit() {
        this.listenCondition = false;
        this.txHash = this._userService.getHash();
        this.onGetStatus();
        this.listenCondition = setInterval(() => this.onGetStatus(), 12000);
    }

    onGetStatus() {
        console.log('on call get status');
        this._coreService.getTxReceipt(this.txHash)
            .subscribe( receipt => {
                if (receipt) {
                    this.txReceipt = receipt;
                    const statusVal = Number(receipt['status']);
                    if (statusVal === 1) {
                        this.txReceipt['status'] = 'Success';
                        clearInterval(this.listenCondition);
                    } else if (statusVal === 0) {
                        this.txReceipt['status'] = 'Failure';
                        clearInterval(this.listenCondition);
                    }
                    this._coreService.getBlock(receipt['blockHash'])
                        .subscribe(block => {
                            this.blockDetail = block;
                            const time = new Date(block['timestamp']);
                            this.blockDetail['timestamp'] = time;
                        });
                } else {
                    this.txReceipt = {
                        transactionHash: this.txHash,
                        status: 'Pending'
                    };
                    this.blockDetail = {
                        timestamp: ''
                    };
                }
        });
    }
}
