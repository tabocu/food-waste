import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { ReceitasPage } from '../receitas/receitas'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlimentosPage;
  tab2Root = ReceitasPage;

  constructor() {

  }
}
