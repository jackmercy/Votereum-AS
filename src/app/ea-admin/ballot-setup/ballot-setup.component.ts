import { Component, OnInit, ViewChild }                  from '@angular/core';
/* import * as _moment          from 'moment';
import { default as _rollupMoment }                      from 'moment'; */
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatSelectionList, MatStepper }                  from '@angular/material';
/*
const moment = _rollupMoment || _moment; */
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

    @ViewChild('shoes') private selectionList: MatSelectionList;

    typesOfShoes: string[] = ['Trump', 'Obama', 'Putin', 'Kim Jong Un'];

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.ballotInfoFormGroup = this._formBuilder.group({
            ballotName: ['', [
                Validators.required,
                Validators.minLength(2)]
            ]
        });
        this.candidateFormGroup = this._formBuilder.group({
            selectedCandidates: ['', Validators.required]
        });
        this.phasesSequenceFormGroup = this._formBuilder.group({
            startRegPhase: ['', Validators.required],
            endRegPhase: ['', Validators.required],
            startVotingPhase: ['', Validators.required],
            endVotingPhase: ['', Validators.required],
        });
        console.log(this.selectionList);

        // get timestamp from moment date format: ...controls['startRegPhase'].value.format('X');
    }

    onTestValue() {
        /* console.log(shoes.selectedOptions.selected.length); */
        console.log(this.ballotInfoFormGroup.get('ballotName').errors);
    }


}
