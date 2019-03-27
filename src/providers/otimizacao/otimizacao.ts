import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlimentoModel } from '../../models/alimento/alimento';
import { PrecosProvider } from '../precos/precos';
import { ReceitasProvider } from '../receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { ResultadoModel } from '../../models/resultado/resultado';
import { ReceitaModel } from '../../models/receita/receita';
import { ResultadosProvider } from '../resultados/resultados';

@Injectable()
export class OtimizacaoProvider {

  private static sUrl: string = 'http://127.0.0.1:3000/opt';
  private static sHeaders: HttpHeaders = OtimizacaoProvider.initHeader();

  private static initHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  constructor(
    public mHttp: HttpClient,
    private mPrecosProvider: PrecosProvider,
    private mReceitasProvider: ReceitasProvider,
    private mResultadosProvider: ResultadosProvider) {
  }

  private getObjetiva() {
    let json = {};
    for (let preco of this.mPrecosProvider.retrieveAll()) {
      json[String(preco.getId())] = preco.mValor;
    }
    return json;
  }

  private getReceitas(alimentoId: number) {
    let json = {};
    for (let receita of this.mReceitasProvider.retrieveAll()) {
      for (let quantidade of receita.mQuantidades) {
        if (quantidade.mId == alimentoId) {
          json[String(receita.getId())] = quantidade.mQuantidade;
        }
      }
    }
    return json;
  }

  private getRestricoes(quantidades: QuantidadeModel<AlimentoModel>[]) {
    let json = {};
    for (let quantidade of quantidades) {
      json[String(quantidade.mId)] = {
        receitas: this.getReceitas(quantidade.mId),
        max: quantidade.mQuantidade
      }
    }
    return json;
  }

  private getBundle(quantidades: QuantidadeModel<AlimentoModel>[]) {
    let json = {
      objetiva: this.getObjetiva(),
      restricoes: this.getRestricoes(quantidades),
    }
    return json;
  }

  private getResultado(json): ResultadoModel {
    let resultado: ResultadoModel = new ResultadoModel();

    resultado.mLucro = Number.parseFloat(json.lucro);

    let quantidadeIds = Object.keys(json.quantidades);
    for (let id of quantidadeIds) {
      let quantidade: QuantidadeModel<ReceitaModel>
        = new QuantidadeModel<ReceitaModel>(Number.parseInt(id), json.quantidades[id]);
      resultado.mQuantidades.push(quantidade);
    }

    let sobraIds = Object.keys(json.sobras);
    for (let id of sobraIds) {
      let sobra: QuantidadeModel<AlimentoModel>
        = new QuantidadeModel<AlimentoModel>(Number.parseInt(id), json.sobras[id]);
      resultado.mSobras.push(sobra);
    }

    return resultado;
  }

  sendOpt(
    quantidades: QuantidadeModel<AlimentoModel>[],
    resultado: (id: number) => void,
    erro: (code: number) => void) {

    try {
      let json = this.getBundle(quantidades);
      this.mHttp.post(
        OtimizacaoProvider.sUrl,
        json,
        { headers: OtimizacaoProvider.sHeaders }
      ).subscribe(data => {
          try {
            let res: ResultadoModel = this.getResultado(data);
            let id: number = this.mResultadosProvider.create(res);
            resultado(id);
          } catch {
            erro(1);
          }
        }, error => {
          erro(2);
        });
    } catch {
      erro(3);      
    }
  }
}
