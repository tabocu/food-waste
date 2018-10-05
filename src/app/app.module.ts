import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AlimentoPage } from '../pages/alimento/alimento'
import { AlimentosPage } from '../pages/alimentos/alimentos'
import { ReceitaPage } from '../pages/receita/receita'
import { ReceitasPage } from '../pages/receitas/receitas'
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlimentosProvider } from '../providers/alimentos/alimentos';
import { ReceitasProvider } from '../providers/receitas/receitas';
import { PrecosProvider } from '../providers/precos/precos';

@NgModule({
  declarations: [
    MyApp,
    AlimentoPage,
    AlimentosPage,
    ReceitaPage,
    ReceitasPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlimentoPage,
    AlimentosPage,
    ReceitaPage,
    ReceitasPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlimentosProvider,
    ReceitasProvider,
    PrecosProvider
  ]
})
export class AppModule {}
