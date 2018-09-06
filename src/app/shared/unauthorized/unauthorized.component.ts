import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

    constructor(private _location: Location) { }

    ngOnInit() {
    }

    onGoBack() {
      this._location.back();
    }
}
