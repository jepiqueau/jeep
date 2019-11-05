//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';

import { ColorpickerPage } from './colorpicker.page';

describe('ColorpickerPage', () => {
  let component: ColorpickerPage;
  let fixture: ComponentFixture<ColorpickerPage>;
  let navCtrlSpy: any;
  beforeEach(async(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', {navigateForward: Promise.resolve()});
    TestBed.configureTestingModule({
      declarations: [ ColorpickerPage ],
      /*schemas: [CUSTOM_ELEMENTS_SCHEMA],*/
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorpickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
