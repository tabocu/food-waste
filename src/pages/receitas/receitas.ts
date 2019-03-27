import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita'
import { QuantidadeModel } from '../../models/quantidade/quantidade';

import { ReceitasProvider } from '../../providers/receitas/receitas'
import { AlimentosProvider } from '../../providers/alimentos/alimentos';

import { ReceitaPage } from '../receita/receita';
import { AlimentoModel } from '../../models/alimento/alimento';
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-receitas',
  templateUrl: 'receitas.html',
})
export class ReceitasPage {

  mIsModal: boolean = false;
  mFilter: number[] = [];

  mReceitas: ReceitaModel[] = [];

  constructor(
    public mNavCtrl: NavController,
    public mNavParams: NavParams,
    public mViewCtrl: ViewController,
    public mReceitasProvider: ReceitasProvider,
    public mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceitasPage');
  }

  ionViewDidEnter() {
    this.mIsModal = this.mNavParams.get('IS_MODAL');
    this.mFilter = this.mNavParams.get('FILTER');
    this.mReceitas = this.mReceitasProvider.retrieveAll();
  }

  getQuantidadesOfReceita(id: number) : QuantidadeModel<AlimentoModel>[] {
    return this.mReceitasProvider.retrieve(id).mQuantidades;
  }

  getAlimentosTextOfReceita(id: number) : string {
    let alimentos: string[] = this.getQuantidadesOfReceita(id).map(
      (quantidade: QuantidadeModel<AlimentoModel>) => {
        return this.mAlimentosProvider.retrieve(quantidade.mId).mNome;
      }
    )
    if (alimentos.length > 0) 
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }

  newReceita() {
    this.mNavCtrl.push(ReceitaPage, { ID: IndexedModel.INVALID_ID });
  }

  selectReceita(id: number) {
    if (this.mIsModal) {
      this.mViewCtrl.dismiss(id);
    } else {
      this.mNavCtrl.push(ReceitaPage, { ID: id });
    }
  }
}