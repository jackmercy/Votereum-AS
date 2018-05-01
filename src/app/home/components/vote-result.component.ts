import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';
import { UserService } from '../../core/services/user.service';
@Component({
    selector: 'app-vote-result',
    templateUrl: './vote-result.component.html',
    styleUrls: ['./vote-result.component.scss']
})
export class VoteResultComponent implements OnInit {
    txReceipt: any;
    blockDetail: any;

    constructor(private _coreService: CoreService,
                private _userService: UserService) { }

    ngOnInit() {
        const hash = this._userService.getHash();
        this._coreService.getTxReceipt(hash)
            .subscribe( receipt => {
                this.txReceipt = receipt;
                const statusVal = Number(receipt['status']);
                if (statusVal === 1) {
                    this.txReceipt['status'] = 'Success';
                } else if (statusVal === 0) {
                    this.txReceipt['status'] = 'Failure';
                } else {
                    this.txReceipt['status'] = 'Pending';
                }
                this._coreService.getBlock(receipt['blockHash'])
                    .subscribe(block => {
                        this.blockDetail = block;
                        const time = new Date(block['timestamp']);
                        this.blockDetail['timestamp'] = time;
                    });
            });
    }

}
