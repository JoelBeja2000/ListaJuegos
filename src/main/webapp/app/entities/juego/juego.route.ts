import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Juego } from 'app/shared/model/juego.model';
import { JuegoService } from './juego.service';
import { JuegoComponent } from './juego.component';

import { IJuego } from 'app/shared/model/juego.model';
import { JuegoDetailComponent } from './detail/juego-detail.component';
import { JuegoUpdateComponent } from './update/juego-update.component';
import { JuegoDeleteDialogComponent } from './delete/juego-delete-dialog.component';
import { JuegoCambioEstadoDialogComponent } from './cambio-estados/juego-cambio-estado-dialog.component';

@Injectable({ providedIn: 'root' })
export class JuegoResolve implements Resolve<IJuego> {
  constructor(private service: JuegoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IJuego> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Juego>) => response.ok),
        map((juego: HttpResponse<Juego>) => juego.body)
      );
    }
    return of(new Juego());
  }
}

export const juegoRoute: Routes = [
  {
    path: '',
    component: JuegoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'listajuegosApp.juego.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: JuegoDetailComponent,
    resolve: {
      juego: JuegoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'listajuegosApp.juego.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: JuegoUpdateComponent,
    resolve: {
      juego: JuegoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'listajuegosApp.juego.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: JuegoUpdateComponent,
    resolve: {
      juego: JuegoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'listajuegosApp.juego.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
