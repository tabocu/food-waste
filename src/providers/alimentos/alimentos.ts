import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../app/models/alimento-model'

@Injectable()
export class AlimentosProvider {

  alimentos: AlimentoModel[] = [
    new AlimentoModel(0, "Arroz branco", "Carboidrato"),
    new AlimentoModel(1, "Feijão carioquinha", "Carboidrato"),
    new AlimentoModel(2, "Carne de panela", "Proteina"),
    new AlimentoModel(3, "Carne moida", "Proteina"),
    new AlimentoModel(4, "Quiabo", "Legume"),
    new AlimentoModel(5, "Farofa de ovo", "Misto"),
    new AlimentoModel(6, "Frango com quiabo", "Proteina"),
  ];

  constructor() { }

  getAlimentos(): AlimentoModel[] {
    return this.alimentos;
  }

  filterAlimentos(searchTerm: string): AlimentoModel[] {
    return this.alimentos.filter((alimento) => {
      return alimento.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
