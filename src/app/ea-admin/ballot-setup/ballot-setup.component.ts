import { Component, OnInit, ViewChild }                  from '@angular/core';
/* import * as _moment          from 'moment';
import { default as _rollupMoment }                      from 'moment'; */
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { MatSelectionList, MatStepper }                  from '@angular/material';
import { ElectionAdminService }                          from '@services/election-admin.service';
import { BallotService }                                 from '@services/ballot.service';
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
    candidates: Array<Object>;

    @ViewChild('selectionList') private candidateList: MatSelectionList;



    typesOfShoes: Object[] = [{
        name: 'sod'
    },
        { name: 'sdfdsf'}
    ];

    constructor(private _formBuilder: FormBuilder,
                private _eaService: ElectionAdminService,
                private _ballotService: BallotService) {}

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

        this._eaService.getCandidateList().subscribe(data =>
            this.candidates = data);

        // get timestamp from moment date format: ...controls['startRegPhase'].value.format('X');
    }

    onSetupClicked() {
        const ballotInfoGroup = this.ballotInfoFormGroup.getRawValue();
        const phaseSequenceGroup = {
            startRegPhase: this.phasesSequenceFormGroup.get('startRegPhase').value.format('X'),
            endRegPhase: this.phasesSequenceFormGroup.get('endRegPhase').value.format('X'),
            startVotingPhase: this.phasesSequenceFormGroup.get('startVotingPhase').value.format('X'),
            endVotingPhase: this.phasesSequenceFormGroup.get('endVotingPhase').value.format('X'),
        };
        const candidateListGroup = {
            candidateIds: this.candidateList.selectedOptions.selected
                          .map(option => option.value)
        };
        const payload = Object.assign(
            {},
            ballotInfoGroup,
            phaseSequenceGroup,
            candidateListGroup);
        this._ballotService.postBallotInfo(payload).subscribe(data => console.log(data));
    }


}
