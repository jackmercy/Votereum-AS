import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
    candidates: Object;
    constructor(private _coreService: CoreService) { }

    ngOnInit() {
        this._coreService.getCandidates()
            .subscribe(
                data => {
                    this.candidates = data;
                },
                error => {
                    console.log(error);
                }
            );
    }

}
