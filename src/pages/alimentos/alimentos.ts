import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { AlimentoPage } from '../alimento/alimento'
import { AlimentoModel } from '../../models/alimento/alimento'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {

  isModal: boolean;
  filter: Key<AlimentoModel>[];

  alimentos: AlimentoModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alimentosProvider: AlimentosProvider) {

    this.isModal = this.navParams.get('isModal');
    this.filter = this.navParams.get('filter');
    this.alimentos = this.alimentosProvider.retrieveAll();
  }

  newAlimento() {
    this.navCtrl.push(AlimentoPage);
  }

  selectAlimento(key: Key<AlimentoModel>) {
    if (this.isModal) {
      this.viewCtrl.dismiss(key);
    } else {
      this.navCtrl.push(AlimentoPage, { key: key });
    }
  }
}
