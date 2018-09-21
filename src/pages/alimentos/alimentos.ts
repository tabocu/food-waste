import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlimentoModel } from '../../app/models/alimento-model'
import { AlimentosProvider } from '../../providers/alimentos/alimentos'

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {

  alimentos: AlimentoModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alimentosProvider: AlimentosProvider) {
    this.alimentos = alimentosProvider.getAlimentos();
  }

  getAlimentos(): AlimentoModel[] {
    return this.alimentos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentosPage');
  }

}
