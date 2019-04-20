import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../models/alimento/alimento'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AlimentosProvider {

  private static sUrl: string = 'http://127.0.0.1:3000/data/alimento';
  private static sHeaders: HttpHeaders = AlimentosProvider.initHeader();

  private static initHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  private mAlimentos: AlimentoModel[] = [];
 
  constructor(public mHttp: HttpClient) {
    this.loadAlimentos();
  }

  private getIndex(id: number) : number {
    return this.mAlimentos.findIndex((alimento) => { return alimento.getId() == id; });
  }

  loadAlimentos() {
    this.mHttp.get(
      AlimentosProvider.sUrl,
      { headers: AlimentosProvider.sHeaders }
    ).subscribe(data => {
        this.mAlimentos = AlimentoModel.fromJSONList(data);
    })
  }

  create(alimento: AlimentoModel) {
    this.mHttp.put(
      AlimentosProvider.sUrl,
      alimento.toJSON(),
      { headers: AlimentosProvider.sHeaders }
    ).subscribe(() => {
      this.loadAlimentos();
    })
  }

  retrieve(id: number) : AlimentoModel {
    return this.mAlimentos[this.getIndex(id)].clone();
  }

  retrieveAll(): AlimentoModel[] {
    return this.mAlimentos;
  }

  update(alimento: AlimentoModel) {
    this.mHttp.put(
      AlimentosProvider.sUrl,
      alimento.toJSON(),
      { headers: AlimentosProvider.sHeaders }
    ).subscribe(() => {
      this.loadAlimentos();
    })
  }
}