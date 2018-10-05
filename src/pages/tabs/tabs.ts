import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { ReceitasPage } from '../receitas/receitas'
import { PrecosPage } from '../precos/precos';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlimentosPage;
  tab2Root = ReceitasPage;
  tab3Root = PrecosPage;

  constructor() {

  }
}
