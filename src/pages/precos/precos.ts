import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PrecosProvider } from '../../providers/precos/precos';
import { PrecoModel } from '../../models/receita/receita';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { PrecoPage } from '../preco/preco';
import { AlimentoModel } from '../../models/alimento/alimento';
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-precos',
  templateUrl: 'precos.html',
})
export class PrecosPage {

  mIsModal: boolean = false;
  mFilter: number[] = [];

  mPrecos: PrecoModel[] = [];

  constructor(public mNavCtrl: NavController,
              public mNavParams: NavParams,
              public mViewCtrl: ViewController,
              public mPrecosProvider: PrecosProvider,
              public mReceitasProvider: ReceitasProvider,
              public mAlimentosProvider: AlimentosProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrecoPage');
  }

  ionViewDidEnter() {
    this.mIsModal = this.mNavParams.get('IS_MODAL');
    this.mFilter = this.mNavParams.get('FILTER');
    this.mPrecos = this.mPrecosProvider.retrieveAll();
  }

  newPreco() {
    this.mNavCtrl.push(PrecoPage, { ID: IndexedModel.INVALID_ID });
  }

  selectPreco(id: number) {
    if (this.mIsModal) {
      this.mViewCtrl.dismiss(id);
    } else {
      this.mNavCtrl.push(PrecoPage, { ID: id });
    }
  }

  getNomeOfReceita(id: number) : string {
    return this.mReceitasProvider.retrieve(id).mNome;
  }

  getQuantidadesOfReceita(id: number): QuantidadeModel<AlimentoModel>[] {
    return this.mReceitasProvider.retrieve(id).mQuantidades;
  }

  getAlimentosTextOfReceita(id: number): string {
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
}