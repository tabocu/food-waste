import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita'
import { ReceitasProvider } from '../../providers/receitas/receitas'

@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {
  receitas: ReceitaModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public receitaProvider: ReceitasProvider) {

    this.receitas = this.receitaProvider.retrieveAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }
  newReceita() {
    // this.navCtrl.push(ReceitaPage);
  }

  selectReceita(key: Number) {
    // this.navCtrl.push(ReceitaPage, { key: key });
  }
}
