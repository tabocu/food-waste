import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  isModal: boolean;
  filter: number[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public receitasProvider: ReceitasProvider,
              public alimentosProvider: AlimentosProvider) {

    this.isModal = this.navParams.get('isModal');
    this.filter = this.navParams.get('filter');
    this.receitas = this.receitasProvider.retrieveAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

  getQuantidadesOfReceita(receitaKey: number) : QuantidadeModel[] {
    return this.receitasProvider.retrieve(receitaKey).quantidades;
  }

  getAlimentosTextOfReceita(receitaKey: number) : string {
    let alimentos: string[] = this.getQuantidadesOfReceita(receitaKey).map(
      (quantidade: QuantidadeModel) => {
        return this.alimentosProvider.retrieve(quantidade.alimentoKey).nome;
      }
    )
    if (alimentos.length > 0) 
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }

  newReceita() {
    this.navCtrl.push(ReceitaPage);
  }

  selecReceita(key: number) {
    console.log('AlimentoKey: ' + key);
    if (this.isModal) {
      this.viewCtrl.dismiss(key);
    } else {
      this.navCtrl.push(ReceitaPage, { key: key });
    }
  }
}
