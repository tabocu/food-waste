import { Injectable } from '@angular/core';

import { ReceitaModel } from '../../models/receita/receita'

@Injectable()
export class ReceitasProvider {

  private keyCounter: number = 0;
  private receitas: ReceitaModel[] = [];

  constructor() {

  }

  private getNextKey() : number {
    return this.keyCounter++;
  }

  private getIndex(key: number) : number {
    return this.receitas.findIndex((alimento) => { return alimento.getKey() == key; });
  }

  create(alimento: ReceitaModel) {
    alimento.setKey(this.getNextKey());
    this.receitas.push(alimento);
  }

  retrieve(key: number) : ReceitaModel {
    return this.receitas[this.getIndex(key)].clone();
  }

  retrieveAll(): ReceitaModel[] {
    return this.receitas;
  }

  update(alimento: ReceitaModel) {
    this.receitas[this.getIndex(alimento.getKey())] = alimento;
  }

  delete(key: number) {
    delete this.receitas[this.getIndex(key)];
  }
}
