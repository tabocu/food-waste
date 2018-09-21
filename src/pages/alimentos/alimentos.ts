import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AlimentoModel } from '../../app/models/alimento-model'

@Component({
  selector: 'page-alimentos',
  templateUrl: 'alimentos.html',
})
export class AlimentosPage {

  alimentos: AlimentoModel[] = [
    new AlimentoModel("Arroz branco", "Carboidrato"),
    new AlimentoModel("Feijão carioquinha", "Carboidrato"),
    new AlimentoModel("Carne de panela", "Proteina"),
    new AlimentoModel("Carne moida", "Proteina"),
    new AlimentoModel("Quiabo", "Legume"),
    new AlimentoModel("Farofa de ovo", "Misto"),
    new AlimentoModel("Frango com quiabo", "Proteina"),
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

  }

  getAlimentos(): AlimentoModel[] {
    return this.alimentos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlimentosPage');
  }

}
