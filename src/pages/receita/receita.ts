import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita';
import { AlimentosPage } from '../alimentos/alimentos';
import { AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { Key } from '../../utils/keygen';
import { QuantidadeModel } from '../../models/quantidade/quantidade';

@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html',
})
export class ReceitaPage {
  receita: ReceitaModel = new ReceitaModel();
  quantidadeTotal: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private receitasProvider: ReceitasProvider,
    private alimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitaPage');
  }

  ionViewDidEnter() {
    let key: Key <ReceitaModel> = this.navParams.get('key');
    if (key != null) this.receita = this.receitasProvider.retrieve(key);
    this.updateQuantidadeTotal();
  }

  getAlimento(key: Key<AlimentoModel>) : AlimentoModel {
      return this.alimentosProvider.retrieve(key);
  }

  fetchAlimento() {
    let alimentosModal = this.modalCtrl.create(AlimentosPage, { 
      isModal: true,
      filter: this.receita.quantidades.map(
        (quantidade) => {
          return quantidade.key;
        })
      });
    alimentosModal.onDidDismiss((key : Key<AlimentoModel>) => {
      this.receita.quantidades.push(new QuantidadeModel<AlimentoModel>(key, 100));
      this.updateQuantidadeTotal();
    });
    alimentosModal.present();
  }

  accept() {
    if (this.receita.getKey() == null) this.receitasProvider.create(this.receita);
    else this.receitasProvider.update(this.receita);
    this.navCtrl.pop();
  }

  removeQuantidade(quantidade: QuantidadeModel<AlimentoModel>) {
    for (let i = 0; i < this.receita.quantidades.length; i++)
      if (this.receita.quantidades[i] == quantidade)
        this.receita.quantidades.splice(i, 1);
    this.updateQuantidadeTotal();
  }

  updateQuantidadeTotal() {
    this.quantidadeTotal = this.receita.getQuantidadeTotal();
  }
}
