import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IJuego } from 'app/shared/model/juego.model';
import { AccountService } from 'app/core';
import { JuegoService } from './juego.service';
import { JuegoDeleteDialogComponent } from './delete/juego-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JuegoCambioEstadoDialogComponent } from './cambio-estados/juego-cambio-estado-dialog.component';

@Component({
  selector: 'jhi-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit, OnDestroy {
  juegos: IJuego[];
  currentAccount: any;
  eventSubscriber: Subscription;
  estado: string = '';
  fechaFin: number;
  opciones_fechaFIn = [];
  fechaFinSeleccionado = null;
  mostrarSelect = false;

  constructor(
    protected juegoService: JuegoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService,
    protected modalService: NgbModal
  ) {}

  loadAll() {
    this.juegoService
      .query(this.estado, this.fechaFin)
      .pipe(
        filter((res: HttpResponse<IJuego[]>) => res.ok),
        map((res: HttpResponse<IJuego[]>) => res.body)
      )
      .subscribe(
        (res: IJuego[]) => {
          this.juegos = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  changeEstado(estado: ''): void {
    this.estado = estado;
    this.loadAll();
  }

  selectFecha(fechaFin: number): void {
    this.fechaFin = fechaFin;
    this.loadAll();
  }

  listafechaFIn(fechaFIn_min: number, fechaFIn_max: number) {
    for (let i = fechaFIn_min; i <= fechaFIn_max; i++) {
      this.opciones_fechaFIn.push({ fechaFIn: i });
    }
  }

  ngOnInit() {
    this.listafechaFIn(1900, 2099);
    this.estado = 'Completado';
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInJuegos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IJuego) {
    return item.id;
  }

  delete(juego: IJuego): void {
    const modalRef = this.modalService.open(JuegoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.juego = juego;
    modalRef.result.then(result => {
      if (result === 'deleted') {
        this.loadAll();
      }
    });
  }

  cambioEstado(juego: IJuego, estado: ''): void {
    const modalRef = this.modalService.open(JuegoCambioEstadoDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.estado = estado;
    modalRef.componentInstance.juego = juego;
    modalRef.result.then(result => {
      if (result === 'deleted') {
        this.loadAll();
      }
    });
  }

  registerChangeInJuegos() {
    this.eventSubscriber = this.eventManager.subscribe('juegoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
