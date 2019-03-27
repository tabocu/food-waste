import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita';
import { AlimentosPage } from '../alimentos/alimentos';
import { AlimentoModel } from '../../models/alimento/alimento';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-receita',
  templateUrl: 'receita.html',
})
export class ReceitaPage {
  mReceita: ReceitaModel = new ReceitaModel();
  mQuantidadeTotal: number = 0;

  constructor(
    private mModalCtrl: ModalController,
    private mNavCtrl: NavController,
    private mNavParams: NavParams,
    private mReceitasProvider: ReceitasProvider,
    private mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitaPage');
  }

  ionViewDidEnter() {
    let id: number = this.mNavParams.get('ID');
    if (id != IndexedModel.INVALID_ID) this.mReceita = this.mReceitasProvider.retrieve(id);
    this.updateQuantidadeTotal();
  }

  getAlimento(id: number) : AlimentoModel {
      return this.mAlimentosProvider.retrieve(id);
  }

  fetchAlimento() {
    let alimentosModal = this.mModalCtrl.create(AlimentosPage, { 
      IS_MODAL: true,
      FILTER: this.mReceita.mQuantidades.map(
        (quantidade) => {
          return quantidade.mId;
        })
      });
    alimentosModal.onDidDismiss((id: number) => {
      this.mReceita.mQuantidades.push(new QuantidadeModel<AlimentoModel>(id, 100));
      this.updateQuantidadeTotal();
    });
    alimentosModal.present();
  }

  accept() {
    if (!this.mReceita.isValid()) this.mReceitasProvider.create(this.mReceita);
    else this.mReceitasProvider.update(this.mReceita);
    this.mNavCtrl.pop();
  }

  removeQuantidade(quantidade: QuantidadeModel<AlimentoModel>) {
    for (let i = 0; i < this.mReceita.mQuantidades.length; i++) {
      if (this.mReceita.mQuantidades[i] == quantidade) {
        this.mReceita.mQuantidades.splice(i, 1);
        this.updateQuantidadeTotal();
        return;
      }
    }
  }

  updateQuantidadeTotal() {
    this.mQuantidadeTotal = this.mReceita.getQuantidadeTotal();
  }
}