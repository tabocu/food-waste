import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PrecoModel, ReceitaModel } from '../../models/receita/receita';
import { PrecosProvider } from '../../providers/precos/precos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { ReceitasPage } from '../receitas/receitas';
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-preco',
  templateUrl: 'preco.html',
})
export class PrecoPage {

  mPreco: PrecoModel = new PrecoModel();

  constructor(
    public mModalCtrl: ModalController,
    public mNavCtrl: NavController,
    public mNavParams: NavParams,
    public mPrecosProvider: PrecosProvider,
    public mReceitasProvider: ReceitasProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecoPage');
  }

  ionViewDidEnter() {
    let id: number = this.mNavParams.get('ID');
    if (id != IndexedModel.INVALID_ID) this.mPreco = this.mPrecosProvider.retrieve(id);
  }

  getReceita(id: number): ReceitaModel {
    return id != IndexedModel.INVALID_ID
      ? this.mReceitasProvider.retrieve(id)
      : new ReceitaModel();
  }

  fetchReceita() {
    let receitasModal = this.mModalCtrl.create(ReceitasPage, {
      IS_MODAL: true,
    });

    receitasModal.onDidDismiss((id: number) => {
      this.mPreco.mReceitaId = id;
    });
    receitasModal.present();
  }

  accept() {
    if (!this.mPreco.isValid()) this.mPrecosProvider.create(this.mPreco);
    else this.mPrecosProvider.update(this.mPreco);

    this.mNavCtrl.pop();
  }
}