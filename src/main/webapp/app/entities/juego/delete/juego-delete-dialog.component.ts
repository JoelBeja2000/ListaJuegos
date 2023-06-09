import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJuego } from 'app/shared/model/juego.model';
import { JuegoService } from '../juego.service';
@Component({
  selector: 'jhi-juego-delete-dialog',
  templateUrl: './juego-delete-dialog.component.html'
})
export class JuegoDeleteDialogComponent {
  juego?: IJuego;

  constructor(protected juegoService: JuegoService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.juegoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
