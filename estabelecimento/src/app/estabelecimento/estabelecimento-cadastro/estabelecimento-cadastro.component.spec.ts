import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro.component';

describe('EstabelecimentoCadastroComponent', () => {
  let component: EstabelecimentoCadastroComponent;
  let fixture: ComponentFixture<EstabelecimentoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
