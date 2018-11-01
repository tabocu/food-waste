import { Injectable } from '@angular/core';

import { KeyGen, Key } from '../../utils/keygen';
import { ResultadoModel } from '../../models/resultado/resultado';

@Injectable()
export class ResultadosProvider {

  private keyGen: KeyGen<ResultadoModel> = KeyGen.createKeyGen<ResultadoModel>();
  private resultados: ResultadoModel[] = [];

  constructor() {}

  private getIndex(key: Key<ResultadoModel>) : number {
    return this.resultados.findIndex((resultado) => { return resultado.getKey() == key; });
  }

  create(resultado: ResultadoModel): Key<ResultadoModel> {
    let key = this.keyGen.getNextKey();
    resultado.setKey(key);
    this.resultados.push(resultado);
    return key;
  }

  retrieve(key: Key<ResultadoModel>) : ResultadoModel {
    return this.resultados[this.getIndex(key)].clone();
  }

  retrieveAll(): ResultadoModel[] {
    return this.resultados;
  }

  update(resultado: ResultadoModel) {
    this.resultados[this.getIndex(resultado.getKey())] = resultado;
  }

  delete(key: Key<ResultadoModel>) {
    delete this.resultados[this.getIndex(key)];
  }
}