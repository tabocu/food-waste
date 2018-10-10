import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlimentoModel } from '../../models/alimento/alimento'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-alimento',
  templateUrl: 'alimento.html',
})
export class AlimentoPage {

  alimento: AlimentoModel = new AlimentoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alimentosProvider: AlimentosProvider) {
    let key: Key<AlimentoModel> = this.navParams.get('key');
    if (key != null) this.alimento = this.alimentosProvider.retrieve(key);
  }

  ionViewDidLoad() {}

  accept() {
    if (this.alimento.getKey() == null) this.alimentosProvider.create(this.alimento);
    else this.alimentosProvider.update(this.alimento);
    this.navCtrl.pop();
  }
}
