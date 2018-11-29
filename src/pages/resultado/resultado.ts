import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Key } from '../../utils/keygen';

import { ReceitaModel } from '../../models/receita/receita';
import { ResultadoModel } from '../../models/resultado/resultado';

import { ResultadosProvider } from '../../providers/resultados/resultados';
import { ReceitasProvider } from '../../providers/receitas/receitas';
import { AlimentosProvider } from '../../providers/alimentos/alimentos';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { AlimentoModel } from '../../models/alimento/alimento';

@Component({
  selector: 'page-resultado',
  templateUrl: 'resultado.html',
})
export class ResultadoPage {

  resultado: ResultadoModel = new ResultadoModel();  

  constructor(
    private navParams: NavParams,
    private resultadosProvider: ResultadosProvider,
    private alimentosProvider: AlimentosProvider,
    private receitasProvider: ReceitasProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoPage');
  }

  ionViewDidEnter() {
    let key: Key<ResultadoModel> = this.navParams.get('key');
    if (key != null) this.resultado = this.resultadosProvider.retrieve(key);
  }

  getNomeOfReceita(key: Key<ReceitaModel>): string {
    return this.receitasProvider.retrieve(key).nome;
  }

  getNomeOfAlimento(key: Key<AlimentoModel>): string {
    return this.alimentosProvider.retrieve(key).nome;
  }

  getQuantidadesOfReceita(key: Key<ReceitaModel>): QuantidadeModel<ReceitaModel>[] {
    return this.receitasProvider.retrieve(key).quantidades;
  }

  getAlimentosTextOfReceita(key: Key<ReceitaModel>): string {
    let alimentos: string[] = this.getQuantidadesOfReceita(key).map(
      (quantidade: QuantidadeModel<ReceitaModel>) => {
        return this.alimentosProvider.retrieve(quantidade.key).nome;
      }
    )

    if (alimentos.length > 0)
      return alimentos.join(', ');
    else
      return "Nenhum alimento cadastrado";
  }
}