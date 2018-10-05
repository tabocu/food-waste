import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita'
import { QuantidadeModel } from '../../models/alimento/alimento';

import { ReceitasProvider } from '../../providers/receitas/receitas'
import { AlimentosProvider } from '../../providers/alimentos/alimentos';

import { ReceitaPage } from '../receita/receita';

@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {
  receitas: ReceitaModel[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public receitasProvider: ReceitasProvider,
              public alimentosProvider: AlimentosProvider) {

    this.receitas = this.receitasProvider.retrieveAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

  getQuantidades(key: number) : QuantidadeModel[] {
    return this.receitasProvider.retrieve(key).quantidades;
  }

  getAlimentosText(key: number) : string {
    let alimentos: string[] = [];
    this.getQuantidades(key).forEach((quantidade) => { 
      alimentos.push(this.alimentosProvider.retrieve(quantidade.alimentoKey).nome);
    })
    if (alimentos.length > 0) 
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }

  newReceita() {
    this.navCtrl.push(ReceitaPage);
  }

  selectReceita(key: number) {
    this.navCtrl.push(ReceitaPage, { key: key });
  }
}
