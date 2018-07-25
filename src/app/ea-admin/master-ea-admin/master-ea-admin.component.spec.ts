import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEaAdminComponent } from './master-ea-admin.component';

describe('MasterEaAdminComponent', () => {
  let component: MasterEaAdminComponent;
  let fixture: ComponentFixture<MasterEaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterEaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterEaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
