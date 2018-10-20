import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita'
import { QuantidadeModel } from '../../models/alimento/alimento';

import { ReceitasProvider } from '../../providers/receitas/receitas'
import { AlimentosProvider } from '../../providers/alimentos/alimentos';

import { ReceitaPage } from '../receita/receita';
import { Key } from '../../utils/keygen';

@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  isModal: boolean = false;
  filter: Key<ReceitaModel>[] = [];

  receitas: ReceitaModel[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public receitasProvider: ReceitasProvider,
    public alimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

  ionViewDidEnter() {
    this.isModal = this.navParams.get('isModal');
    this.filter = this.navParams.get('filter');
    this.receitas = this.receitasProvider.retrieveAll();
  }

  getQuantidadesOfReceita(key: Key<ReceitaModel>) : QuantidadeModel[] {
    return this.receitasProvider.retrieve(key).quantidades;
  }

  getAlimentosTextOfReceita(key: Key<ReceitaModel>) : string {
    let alimentos: string[] = this.getQuantidadesOfReceita(key).map(
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

  selectReceita(key: Key<ReceitaModel>) {
    if (this.isModal) {
      this.viewCtrl.dismiss(key);
    } else {
      this.navCtrl.push(ReceitaPage, { key: key });
    }
  }
}
