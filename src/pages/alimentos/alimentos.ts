import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { AlimentoPage } from '../alimento/alimento'
import { AlimentoModel } from '../../models/alimento/alimento'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {
  mIsModal: boolean = false;
  mFilter: number[] = [];

  mAlimentos: AlimentoModel[] = [];

  constructor(
    public mNavCtrl: NavController,
    public mNavParams: NavParams,
    public mViewCtrl: ViewController,
    public mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentosPage');
  }

  ionViewDidEnter() {
    this.mIsModal = this.mNavParams.get('IS_MODAL');
    this.mFilter = this.mNavParams.get('FILTER');
    this.mAlimentos = this.mAlimentosProvider.retrieveAll();
  }

  newAlimento() {
    this.mNavCtrl.push(AlimentoPage, { ID: IndexedModel.INVALID_ID });
  }

  selectAlimento(id: number) {
    if (this.mIsModal) {
      this.mViewCtrl.dismiss(id);
    } else {
      this.mNavCtrl.push(AlimentoPage, { ID: id });
    }
  }
}
