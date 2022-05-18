import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebateSourceComponent } from './debate-source.component';

describe('DebateSourceComponent', () => {
  let component: DebateSourceComponent;
  let fixture: ComponentFixture<DebateSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebateSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebateSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
