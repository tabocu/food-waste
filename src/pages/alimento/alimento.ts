import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlimentoModel } from '../../models/alimento/alimento'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-alimento',
  templateUrl: 'alimento.html',
})
export class AlimentoPage {

  mAlimento: AlimentoModel = new AlimentoModel();

  constructor(
    public mNavCtrl: NavController,
    public mNavParams: NavParams,
    public mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentoPage');
  }

  ionViewDidEnter() {
    let id: number = this.mNavParams.get('ID');
    if (id != IndexedModel.INVALID_ID) this.mAlimento = this.mAlimentosProvider.retrieve(id);
  }

  accept() {
    if (!this.mAlimento.isValid()) this.mAlimentosProvider.create(this.mAlimento);
    else this.mAlimentosProvider.update(this.mAlimento);
    
    this.mNavCtrl.pop();
  }
}