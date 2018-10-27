import { MyApp } from './app.component';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AlimentoPage } from '../pages/alimento/alimento'
import { AlimentosPage } from '../pages/alimentos/alimentos'

import { ReceitaPage } from '../pages/receita/receita'
import { ReceitasPage } from '../pages/receitas/receitas'

import { PrecoPage } from '../pages/preco/preco'
import { PrecosPage } from '../pages/precos/precos'

import { QuantidadesPage } from '../pages/quantidades/quantidades';
import { ResultadoPage } from '../pages/resultado/resultado';

import { TabsPage } from '../pages/tabs/tabs';
import { RunPage } from '../pages/run/run';

import { IndexedPipe } from '../pipes/indexed/indexed';

import { AlimentosProvider } from '../providers/alimentos/alimentos';
import { ReceitasProvider } from '../providers/receitas/receitas';
import { PrecosProvider } from '../providers/precos/precos';
import { OtimizacaoProvider } from '../providers/otimizacao/otimizacao';
import { ResultadosProvider } from '../providers/resultados/resultados';

@NgModule({
  declarations: [
    MyApp,
    AlimentosPage,
    AlimentoPage,
    ReceitasPage,
    ReceitaPage,
    PrecosPage,
    PrecoPage,
    QuantidadesPage,
    ResultadoPage,
    RunPage,
    TabsPage,
    IndexedPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlimentosPage,
    AlimentoPage,
    ReceitasPage,
    ReceitaPage,
    PrecosPage,
    PrecoPage,
    QuantidadesPage,
    ResultadoPage,
    RunPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlimentosProvider,
    ReceitasProvider,
    PrecosProvider,
    OtimizacaoProvider,
    ResultadosProvider
  ]
})
export class AppModule {}