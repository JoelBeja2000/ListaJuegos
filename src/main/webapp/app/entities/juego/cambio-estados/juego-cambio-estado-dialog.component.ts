import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJuego } from 'app/shared/model/juego.model';
import { JuegoService } from '../juego.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'jhi-juego-cambio-estado-dialog',
  templateUrl: './juego-cambio-estado-dialog.component.html'
})
export class JuegoCambioEstadoDialogComponent {
  estado: string;
  fechaInicio: Moment = moment();
  fechaFin: Moment = moment();
  constructor(protected juegoService: JuegoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  cambioEstado(juego: IJuego): void {
    juego.estado = this.estado;
    juego.fechaInicio = this.fechaInicio;
    juego.fechaFin = this.fechaFin;
    this.juegoService.update(juego).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
