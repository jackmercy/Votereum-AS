import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BallotService }    from '@services/ballot.service';

/* export const _result = [
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
 */

@Component({
    selector: 'app-score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {

    votingData: any;
    candidateNames: any;
    listCandidateIds: any;
    result: any;
    isGettingData: Boolean = true;
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
    yAxisTickFormatting = function(val) {
        if (val % 1 === 0) {
        return val.toLocaleString();
      } else {
        return '';
      }
    };

    constructor(private _ballotService: BallotService) { }

    ngOnInit() {
        this.isGettingData = true;
        // console.log(this._ballotService.getBallotResult().s);
        this._ballotService.getBallotResult().subscribe(value => {
            this.result = value;
            console.log(this.result);
            this.isGettingData = false;
        });
    }

    onSelect(event) {
        console.log(event);
    }
}
