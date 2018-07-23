import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../core/services/core.service';

import { Chart } from 'chart.js';
@Component({
    selector: 'app-score-board',
    templateUrl: './score-board.component.html',
    styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent implements OnInit {
    chart: any;
    votingData: any;
    candidateNames: any;
    listCandidateIds: any;
    constructor(private _coreService: CoreService) { }

    ngOnInit() {
        this._coreService.getVotingData()
            .subscribe( data => {
                this.votingData = this.convertChartjsData(data);
                this.listCandidateIds = this.convertToArrayIds(data);
                const msg = {
                    candidateIds: this.listCandidateIds
                };
                this._coreService.getCandidateListName(msg)
                    .subscribe( names => {
                        this.candidateNames = names['candidateNames'];
                        this.initChart(true);
                    });
            });
    }

    initChart(isOk: Boolean) {
        if (isOk) {
            this.chart = new Chart('canvas', {
                type: 'bar',
                data: {
                    labels: this.candidateNames,
                    datasets: [{
                        label: '# of Votes',
                        data: this.votingData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            fontColor: '#000'
                        }
                    }
                }
            });
        }
    }

    convertChartjsData(data: Object) {
        const result = new Array();
        for (const candidate in data ) {
            if (data.hasOwnProperty(candidate)) {
                result.push(data[candidate]);
            }
        }
        return result;
    }

    convertToArrayIds(data: Object) {
        const result = new Array();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    }
}
