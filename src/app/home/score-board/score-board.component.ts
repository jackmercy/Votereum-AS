import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ContractService }  from '@services/contract.service';
import { CandidateService } from '@services/candidate.service';
import { BallotService }    from '@services/ballot.service';

export const single = [
    {
      'name': 'Germany',
      'value': 8940000
    },
    {
      'name': 'USA',
      'value': 5000000
    },
    {
      'name': 'France',
      'value': 7200000
    },
    {
        'name': 'Vietnam',
        'value': 9200000
    },
    {
        'name': 'IT',
        'value': 5000000
    },
    {
        'name': 'Canada',
        'value': 800000
    },
    {
        'name': 'LalaLand',
        'value': 400000
    }
];


@Component({
    selector: 'app-score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {
    single: any[];

     votingData: any;
    candidateNames: any;
    listCandidateIds: any;
    result: any;

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Candidates';
    showYAxisLabel = true;
    yAxisLabel = 'Votes';

    colorScheme = {
        domain: ['#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
        '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3']
    };

    constructor(private _candidateService: CandidateService,
                private _contractService: ContractService,
                private _ballotService: BallotService) { }

    ngOnInit() {
        // console.log(this._ballotService.getBallotResult().s);
         this._ballotService.getBallotResult().subscribe(value => {
             this.result = value;
             console.log(this.result);
         });
        Object.assign(this, { single });
    }

    onSelect(event) {
        console.log(event);
    }
}
