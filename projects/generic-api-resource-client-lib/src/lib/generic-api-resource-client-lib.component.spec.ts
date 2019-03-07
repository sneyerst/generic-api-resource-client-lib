import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericApiResourceClientLibComponent } from './generic-api-resource-client-lib.component';

describe('GenericApiResourceClientLibComponent', () => {
  let component: GenericApiResourceClientLibComponent;
  let fixture: ComponentFixture<GenericApiResourceClientLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericApiResourceClientLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericApiResourceClientLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
