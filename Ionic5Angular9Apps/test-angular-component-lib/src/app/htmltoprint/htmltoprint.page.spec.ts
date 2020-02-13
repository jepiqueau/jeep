import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HtmltoprintPage } from './htmltoprint.page';
import { ComponentLibraryModule } from '@jeepq/angular';

describe('HtmltoprintPage', () => {
  let component: HtmltoprintPage;
  let fixture: ComponentFixture<HtmltoprintPage>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmltoprintPage ],
      imports: [ 
        ComponentLibraryModule,
     ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmltoprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
