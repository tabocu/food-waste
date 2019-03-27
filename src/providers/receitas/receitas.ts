import { Injectable } from '@angular/core';

import { ReceitaModel } from '../../models/receita/receita'

@Injectable()
export class ReceitasProvider {

  private mReceitas: ReceitaModel[] = [];
  private mCounter = 0;

  constructor() {}

  private getIndex(id: number) : number {
    return this.mReceitas.findIndex((alimento) => { return alimento.getId() == id; });
  }

  create(alimento: ReceitaModel): number {
    alimento.setId(this.mCounter);
    this.mReceitas.push(alimento);
    ++this.mCounter;
    return alimento.getId();
  }

  retrieve(id: number) : ReceitaModel {
    return this.mReceitas[this.getIndex(id)].clone();
  }

  retrieveAll(): ReceitaModel[] {
    return this.mReceitas;
  }

  update(alimento: ReceitaModel) {
    this.mReceitas[this.getIndex(alimento.getId())] = alimento;
  }

  delete(id: number) {
    delete this.mReceitas[this.getIndex(id)];
  }
}
