import { Component } from '@angular/core';

import { AlimentosPage } from '../alimentos/alimentos'
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlimentosPage;
  tab2Root = AboutPage;

  constructor() {

  }
}
