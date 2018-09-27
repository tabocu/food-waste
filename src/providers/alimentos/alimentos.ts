import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../models/alimento/alimento'

@Injectable()
export class AlimentosProvider {

  private keyCounter: number = 0;
  private alimentos: AlimentoModel[] = [];

  constructor() {
    this.create(new AlimentoModel("Arroz branco", "Carboidrato"));
    this.create(new AlimentoModel("Feijão carioquinha", "Carboidrato"));
    this.create(new AlimentoModel("Carne de panela", "Proteina"));
    this.create(new AlimentoModel("Carne moida", "Proteina"));
    this.create(new AlimentoModel("Quiabo", "Legume"));
    this.create(new AlimentoModel("Farofa de ovo", "Misto"));
    this.create(new AlimentoModel("Frango com quiabo", "Proteina"));
  }

  private getNextKey() : number {
    return this.keyCounter++;
  }

  private getIndex(key: number) : number {
    return this.alimentos.findIndex((alimento) => { return alimento.getKey() == key; });
  }

  create(alimento: AlimentoModel) {
    alimento.setKey(this.getNextKey());
    this.alimentos.push(alimento);
  }

  retrieve(key: number) : AlimentoModel {
    return this.alimentos[this.getIndex(key)].clone();
  }

  retrieveAll(): AlimentoModel[] {
    return this.alimentos;
  }

  update(alimento: AlimentoModel) {
    this.alimentos[this.getIndex(alimento.getKey())] = alimento;
  }

  delete(key: number) {
    delete this.alimentos[this.getIndex(key)];
  }
}
