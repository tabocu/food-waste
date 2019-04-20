import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { ReceitasPage } from '../receitas/receitas'
import { PrecosPage } from '../precos/precos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mTab1Root = AlimentosPage;
  mTab2Root = ReceitasPage;
  mTab3Root = PrecosPage;

  constructor() {}
}