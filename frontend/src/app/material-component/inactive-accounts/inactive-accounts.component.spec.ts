import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveAccountsComponent } from './inactive-accounts.component';

describe('InactiveAccountsComponent', () => {
  let component: InactiveAccountsComponent;
  let fixture: ComponentFixture<InactiveAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
