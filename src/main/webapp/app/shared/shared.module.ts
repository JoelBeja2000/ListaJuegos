import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListajuegosSharedLibsModule, ListajuegosSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ListajuegosSharedLibsModule, ListajuegosSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ListajuegosSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListajuegosSharedModule {
  static forRoot() {
    return {
      ngModule: ListajuegosSharedModule
    };
  }
}
