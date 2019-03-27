import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ReceitaModel } from '../../models/receita/receita';
import { ResultadoModel } from '../../models/resultado/resultado';

import { ResultadosProvider } from '../../providers/resultados/resultados';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { IndexedModel } from '../../models/utils/indexed';

@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  mResultado: ResultadoModel = new ResultadoModel();  

  constructor(
    private mNavParams: NavParams,
    private mResultadosProvider: ResultadosProvider,
    private mAlimentosProvider: AlimentosProvider,
    private mReceitasProvider: ReceitasProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  ionViewDidEnter() {
    let id: number = this.mNavParams.get('ID');
    if (id != IndexedModel.INVALID_ID) this.mResultado = this.mResultadosProvider.retrieve(id);
  }

  getNomeOfReceita(id: number): string {
    return this.mReceitasProvider.retrieve(id).mNome;
  }

  getNomeOfAlimento(id: number): string {
    return this.mAlimentosProvider.retrieve(id).mNome;
  }

  getQuantidadesOfReceita(id: number): QuantidadeModel<ReceitaModel>[] {
    return this.mReceitasProvider.retrieve(id).mQuantidades;
  }

  getAlimentosTextOfReceita(id: number): string {
    let alimentos: string[] = this.getQuantidadesOfReceita(id).map(
      (quantidade: QuantidadeModel<ReceitaModel>) => {
        return this.mAlimentosProvider.retrieve(quantidade.mId).mNome;
      }
    )

    if (alimentos.length > 0)
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }
}