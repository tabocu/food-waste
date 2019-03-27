import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../models/alimento/alimento'

@Injectable()
export class AlimentosProvider {

  private mAlimentos: AlimentoModel[] = [];
  private mCounter: number = 0;

  constructor() {}

  private getIndex(id: number) : number {
    return this.mAlimentos.findIndex((alimento) => { return alimento.getId() == id; });
  }

  create(alimento: AlimentoModel) : number {
    alimento.setId(this.mCounter);
    this.mAlimentos.push(alimento);
    ++this.mCounter;
    return alimento.getId();
  }

  retrieve(id: number) : AlimentoModel {
    return this.mAlimentos[this.getIndex(id)].clone();
  }

  retrieveAll(): AlimentoModel[] {
    return this.mAlimentos;
  }

  update(alimento: AlimentoModel) {
    this.mAlimentos[this.getIndex(alimento.getId())] = alimento;
  }

  delete(id: number) {
    delete this.mAlimentos[this.getIndex(id)];
  }
}