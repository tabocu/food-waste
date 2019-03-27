import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { QuantidadesPage } from '../quantidades/quantidades';

@Component({
  selector: 'page-run',
  templateUrl: 'run.html',
})
export class RunPage {

  constructor(public mAppCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RunPage');
  }

  runOptimizationWizard() {
    this.mAppCtrl.getRootNav().push(QuantidadesPage)
  }
}
