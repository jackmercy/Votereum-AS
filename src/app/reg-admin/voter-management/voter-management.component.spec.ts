import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterManagementComponent } from './voter-management.component';

describe('VoterManagementComponent', () => {
  let component: VoterManagementComponent;
  let fixture: ComponentFixture<VoterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
