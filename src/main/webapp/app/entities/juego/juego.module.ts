import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { JuegoComponent, juegoRoute } from './';
import { JuegoDetailComponent } from './detail/juego-detail.component';
import { JuegoUpdateComponent } from './update/juego-update.component';
import { JuegoDeleteDialogComponent } from './delete/juego-delete-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select'; // Importe NgSelectModule aquí
import { ListajuegosSharedModule } from 'app/shared';
import { MatTabsModule } from '@angular/material/tabs';
import { JuegoCambioEstadoDialogComponent } from './cambio-estados/juego-cambio-estado-dialog.component';
const ENTITY_STATES = [...juegoRoute];

@NgModule({
  imports: [ListajuegosSharedModule, RouterModule.forChild(ENTITY_STATES), NgSelectModule, MatTabsModule],
  declarations: [JuegoComponent, JuegoDetailComponent, JuegoUpdateComponent, JuegoDeleteDialogComponent, JuegoCambioEstadoDialogComponent],
  entryComponents: [JuegoComponent, JuegoUpdateComponent, JuegoDeleteDialogComponent, JuegoCambioEstadoDialogComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListajuegosJuegoModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
