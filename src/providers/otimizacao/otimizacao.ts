import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlimentoModel } from '../../models/alimento/alimento';
import { PrecosProvider } from '../precos/precos';
import { Key } from '../../utils/keygen';
import { ReceitasProvider } from '../receitas/receitas';
import { QuantidadeModel } from '../../models/quantidade/quantidade';

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
    private receitasProvider: ReceitasProvider) {
  }

  getObjetiva() {
    let json = {};
    for (let preco of this.precosProvider.retrieveAll()) {
      json[String(preco.getKey().getId())] = preco.valor;
    }
    return json;
  }

  getReceitas(alimentoKey: Key<AlimentoModel>) {
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

  getRestricoes(quantidades: QuantidadeModel<AlimentoModel>[]) {
    let json = {};
    for (let quantidade of quantidades) {
      json[String(quantidade.key.getId())] = {
        receitas: this.getReceitas(quantidade.key),
        max: quantidade.quantidade
      }
    }
    return json;
  }

  getBundle(quantidades: QuantidadeModel<AlimentoModel>[]) {
    let json = {
      objetiva: this.getObjetiva(),
      restricoes: this.getRestricoes(quantidades),
    }
    return json;
  }

  sendOpt(
    quantidades: QuantidadeModel<AlimentoModel>[],
    resultado: () => void, erro: () => void) {
    try {
      let json = this.getBundle(quantidades);
      this.http.post(
        OtimizacaoProvider.url,
        json,
        { headers: OtimizacaoProvider.headers }
      ).subscribe(data => {
          try {
            resultado();
          } catch {
            erro();
          }
        }, error => {
          erro();
        });
    } catch {
      erro();      
    }
  }
}
