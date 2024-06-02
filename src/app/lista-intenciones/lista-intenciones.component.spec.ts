import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIntencionesComponent } from './lista-intenciones.component';

describe('ListaIntencionesComponent', () => {
  let component: ListaIntencionesComponent;
  let fixture: ComponentFixture<ListaIntencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaIntencionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaIntencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
