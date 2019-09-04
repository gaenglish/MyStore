import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {metaReducers, appReducer} from './store';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule} from 'angular-oauth2-oidc';
import {ProductService} from './services/products.service';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers }),
    HttpClientModule,
    OAuthModule.forRoot()
  ]
})
export class CoreModule {
  // forRoot allows to override providers
  // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ProductService
      ]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
