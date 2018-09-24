import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlimentoPage } from '../alimento/alimento'
import { AlimentoModel } from '../../models/alimento/alimento'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
  alimentos: AlimentoModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alimentosProvider: AlimentosProvider) {
    this.alimentos = this.alimentosProvider.retrieveAll();
  }

  newAlimento() {
    this.navCtrl.push(AlimentoPage);
  }

  selectAlimento(key: Number) {
    this.navCtrl.push(AlimentoPage, { key: key });
  }
}
