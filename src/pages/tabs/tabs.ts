import { Component } from '@angular/core';

import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AboutPage;

  constructor() {

  }
}
