import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../models/alimento/alimento'

@Injectable()
export class AlimentosProvider {

  private keyCounter: number = 0;
  private alimentos: AlimentoModel[] = [];

  constructor() {
    this.insert(new AlimentoModel("Arroz branco", "Carboidrato"));
    this.insert(new AlimentoModel("Feijão carioquinha", "Carboidrato"));
    this.insert(new AlimentoModel("Carne de panela", "Proteina"));
    this.insert(new AlimentoModel("Carne moida", "Proteina"));
    this.insert(new AlimentoModel("Quiabo", "Legume"));
    this.insert(new AlimentoModel("Farofa de ovo", "Misto"));
    this.insert(new AlimentoModel("Frango com quiabo", "Proteina"));
  }

  private getNextKey() : number {
    return this.keyCounter++;
  }

  insert(alimento: AlimentoModel) {
    alimento.setKey(this.getNextKey());
    this.alimentos.push(alimento);
  }

  getAlimentos(): AlimentoModel[] {
    return this.alimentos;
  }

  getAlimento(key: Number): AlimentoModel {
    return this.alimentos.find((alimento) => { return alimento.getKey() == key; });
  } 

  filterAlimentos(searchTerm: string): AlimentoModel[] {
    return this.alimentos.filter((alimento) => {
      return alimento.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
