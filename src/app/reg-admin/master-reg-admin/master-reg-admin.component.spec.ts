import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegAdminComponent } from './master-reg-admin.component';

describe('MasterRegAdminComponent', () => {
  let component: MasterRegAdminComponent;
  let fixture: ComponentFixture<MasterRegAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRegAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
