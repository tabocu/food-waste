import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlimentoModel } from '../../models/alimento/alimento';
import { PrecosProvider } from '../precos/precos';
import { Key } from '../../utils/keygen';
import { ReceitasProvider } from '../receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';
import { ResultadoModel } from '../../models/resultado/resultado';
import { ReceitaModel } from '../../models/receita/receita';
import { ResultadosProvider } from '../resultados/resultados';
import { AlimentosProvider } from '../alimentos/alimentos';

@Injectable()
export class OtimizacaoProvider {

  private static url: string = 'http://127.0.0.1:3000/opt';
  private static headers: HttpHeaders = OtimizacaoProvider.initHeader();

  private static initHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  constructor(
    public http: HttpClient,
    private precosProvider: PrecosProvider,
    private receitasProvider: ReceitasProvider,
    private alimentosProvider: AlimentosProvider,
    private resultadosProvider: ResultadosProvider) {
  }

  private getObjetiva() {
    let json = {};
    for (let preco of this.precosProvider.retrieveAll()) {
      json[String(preco.getKey().getId())] = preco.valor;
    }
    return json;
  }

  private getReceitas(alimentoKey: Key<AlimentoModel>) {
    let json = {};
    for (let receita of this.receitasProvider.retrieveAll()) {
      for (let quantidade of receita.quantidades) {
        if (quantidade.key == alimentoKey) {
          json[String(receita.getKey().getId())] = quantidade.quantidade;
        }
      }
    }
    return json;
  }

  private getRestricoes(quantidades: QuantidadeModel<AlimentoModel>[]) {
    let json = {};
    for (let quantidade of quantidades) {
      json[String(quantidade.key.getId())] = {
        receitas: this.getReceitas(quantidade.key),
        max: quantidade.quantidade
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

    resultado.lucro = Number.parseFloat(json.lucro);

    let quantidadesKeys = Object.keys(json.quantidades);
    for (let key of quantidadesKeys) {
      let quantidade: QuantidadeModel<ReceitaModel> = new QuantidadeModel<ReceitaModel>(
        this.receitasProvider.retrieveKey(Number.parseInt(key)), json.quantidades[key]);
      resultado.quantidades.push(quantidade);
    }

    let sobrasKeys = Object.keys(json.sobras);
    for (let key of sobrasKeys) {
      let sobra: QuantidadeModel<AlimentoModel> = new QuantidadeModel<AlimentoModel>(
        this.alimentosProvider.retrieveKey(Number.parseInt(key)), json.sobras[key]);
      resultado.sobras.push(sobra);
    }

    return resultado;
  }

  sendOpt(
    quantidades: QuantidadeModel<AlimentoModel>[],
    resultado: (key: Key<ResultadoModel>) => void,
    erro: (code: number) => void) {

    try {
      let json = this.getBundle(quantidades);
      this.http.post(
        OtimizacaoProvider.url,
        json,
        { headers: OtimizacaoProvider.headers }
      ).subscribe(data => {
          try {
            let res: ResultadoModel = this.getResultado(data);
            let key: Key<ResultadoModel> = this.resultadosProvider.create(res);
            resultado(key);
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
