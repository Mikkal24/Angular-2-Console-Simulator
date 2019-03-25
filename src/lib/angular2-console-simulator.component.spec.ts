import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2ConsoleSimulatorComponent } from './angular2-console-simulator.component';

describe('Angular2ConsoleSimulatorComponent', () => {
  let component: Angular2ConsoleSimulatorComponent;
  let fixture: ComponentFixture<Angular2ConsoleSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2ConsoleSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2ConsoleSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
