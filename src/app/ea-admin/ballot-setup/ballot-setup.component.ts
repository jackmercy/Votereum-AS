import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-ballot-setup',
    templateUrl: './ballot-setup.component.html',
    styleUrls: ['./ballot-setup.component.scss']
})
export class BallotSetupComponent implements OnInit {
    isLinear = false;
    ballotInfoFormGroup: FormGroup;
    candidateFormGroup: FormGroup;
    phasesSequenceFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.ballotInfoFormGroup = this._formBuilder.group({
            ballotName: ['', Validators.required],
            numberOfCandidates: [
                '',
                Validators.required,
                Validators.max(6),
                Validators.min(2)
            ]
        });
        this.candidateFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
        this.phasesSequenceFormGroup = this._formBuilder.group({
            thirdCtrl: ['', Validators.required]
        });

    }

}
