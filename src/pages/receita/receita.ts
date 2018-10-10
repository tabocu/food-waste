import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita';
import { AlimentosPage } from '../alimentos/alimentos';
import { QuantidadeModel, AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html',
})
export class ReceitaPage {
  receita: ReceitaModel = new ReceitaModel();
  quantidadeTotal: number;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public receitasProvider: ReceitasProvider,
    public alimentosProvider: AlimentosProvider) {
    let key: Key <ReceitaModel> = this.navParams.get('key');
    if (key != null) this.receita = this.receitasProvider.retrieve(key);
    this.updateQuantidadeTotal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitaPage');
  }

  getAlimento(key: Key<AlimentoModel>) : AlimentoModel {
      return this.alimentosProvider.retrieve(key);
  }

  fetchAlimento() {
    let alimentosModal = this.modalCtrl.create(AlimentosPage, { 
      isModal: true,
      filter: this.receita.quantidades.map(
        (quantidade) => {
          return quantidade.alimentoKey;
        })
      });
    alimentosModal.onDidDismiss((key : Key<AlimentoModel>) => {
      this.receita.quantidades.push(new QuantidadeModel(key, 100));
      this.updateQuantidadeTotal();
    });
    alimentosModal.present();
  }

  accept() {
    if (this.receita.getKey() == null) this.receitasProvider.create(this.receita);
    else this.receitasProvider.update(this.receita);
    this.navCtrl.pop();
  }

  removeQuantidade(quantidade: QuantidadeModel) {
    for (let i = 0; i < this.receita.quantidades.length; i++)
      if (this.receita.quantidades[i] == quantidade)
        this.receita.quantidades.splice(i, 1);
    this.updateQuantidadeTotal();
  }

  updateQuantidadeTotal() {
    this.quantidadeTotal = this.receita.getQuantidadeTotal();
  }
}
