import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita';
import { ResultadoModel } from '../../models/resultado/resultado';
import { ResultadosProvider } from '../../providers/resultados/resultados';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  resultado: ResultadoModel = new ResultadoModel();  

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private resultadosProvider: ResultadosProvider,
    private receitasProvider: ReceitasProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  ionViewDidEnter() {
    let key: Key<ResultadoModel> = this.navParams.get('key');
    if (key != null) this.resultado = this.resultadosProvider.retrieve(key);
  }

  getReceita(key: Key<ReceitaModel>): ReceitaModel {
    return this.receitasProvider.retrieve(key);
  }
}