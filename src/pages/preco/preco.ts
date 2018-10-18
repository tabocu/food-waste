import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PrecoModel, ReceitaModel } from '../../models/receita/receita';
import { Key } from '../../utils/keygen';
import { PrecosProvider } from '../../providers/precos/precos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { ReceitasPage } from '../receitas/receitas';

@Component({
  selector: 'page-preco',
  templateUrl: 'preco.html',
})
export class PrecoPage {

  preco: PrecoModel = new PrecoModel();

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public precosProvider: PrecosProvider,
    public receitasProvider: ReceitasProvider) {
    let key: Key<PrecoModel> = this.navParams.get('key');
    if (key != null) this.preco = this.precosProvider.retrieve(key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecoPage');
  }

  getReceita(key: Key<ReceitaModel>): ReceitaModel {
    return key.isValid() 
      ? this.receitasProvider.retrieve(key)
      : new ReceitaModel();
  }

  fetchReceita() {
    let receitasModal = this.modalCtrl.create(ReceitasPage, {
      isModal: true,
    });

    receitasModal.onDidDismiss((key: Key<ReceitaModel>) => {
      this.preco.receitaKey = key;
    });
    receitasModal.present();
  }

  accept() {
    if (this.preco.getKey() == null) this.precosProvider.create(this.preco);
    else this.precosProvider.update(this.preco);
    this.navCtrl.pop();
  }

}
