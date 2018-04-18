import { Component, OnInit,  EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
    @Input('candidate') candidate: Object;

    @Output() $onVoted = new EventEmitter<Object>();

    voted: Boolean;

    constructor() { }

    ngOnInit() {
        this.voted = false;
    }

    onVoteClicked() {
        const result = {
            voted: !this.voted,
            candidateID: this.candidate['_id']
        };
        this.$onVoted.emit(result);
        // console.log(result);
    }

    candidateVotedCheck() {
        this.voted.emit(this.candidate['id']);
    }

}
