import { Injectable } from '@angular/core';

import { ResultadoModel } from '../../models/resultado/resultado';

@Injectable()
export class ResultadosProvider {

  private mResultados: ResultadoModel[] = [];
  private mCounter = 0;

  constructor() {}

  private getIndex(id: number) : number {
    return this.mResultados.findIndex((resultado) => { return resultado.getId() == id; });
  }

  create(resultado: ResultadoModel): number {
    resultado.setId(this.mCounter);
    this.mResultados.push(resultado);
    ++this.mCounter;
    return resultado.getId();
  }

  retrieve(id: number) : ResultadoModel {
    return this.mResultados[this.getIndex(id)].clone();
  }

  retrieveAll(): ResultadoModel[] {
    return this.mResultados;
  }

  update(resultado: ResultadoModel) {
    this.mResultados[this.getIndex(resultado.getId())] = resultado;
  }

  delete(id: number) {
    delete this.mResultados[this.getIndex(id)];
  }
}