import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchModalModule } from './modules/search-modal/search-modal.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      backButtonText: '',
      backButtonIcon: 'arrow-back-outline',
      rippleEffect: false,
    }),
    AppRoutingModule,
    SearchModalModule,
  ],
  providers: [
    StatusBar,
    LottieSplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
