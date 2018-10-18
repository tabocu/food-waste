import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QuantidadePage } from '../quantidade/quantidade';

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
    this.navCtrl.push(QuantidadePage);
  }
}
