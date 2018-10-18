import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuantidadesPage } from '../quantidades/quantidades';

@Component({
  selector: 'page-run',
  templateUrl: 'run.html',
})
export class RunPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RunPage');
  }

  runOptimizationWizard() {
    this.navCtrl.push(QuantidadesPage);
  }
}
