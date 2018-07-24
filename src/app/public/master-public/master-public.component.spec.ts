import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPublicComponent } from '@app/public/master-public/master-public.component';

describe('MasterPublicComponent', () => {
  let component: MasterPublicComponent;
  let fixture: ComponentFixture<MasterPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
