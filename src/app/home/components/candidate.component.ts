import { Component, OnInit,  EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-candidate',
    templateUrl: './candidate.component.html',
    styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {
    @Input('candidate') candidate: Object;
    @Output() voted: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    candidateVotedCheck() {
        this.voted.emit(this.candidate['id']);
    }

}
