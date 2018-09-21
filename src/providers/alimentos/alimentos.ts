import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../app/models/alimento-model'

@Injectable()
export class AlimentosProvider {

  alimentos: AlimentoModel[] = [
    new AlimentoModel("Arroz branco", "Carboidrato"),
    new AlimentoModel("Feijão carioquinha", "Carboidrato"),
    new AlimentoModel("Carne de panela", "Proteina"),
    new AlimentoModel("Carne moida", "Proteina"),
    new AlimentoModel("Quiabo", "Legume"),
    new AlimentoModel("Farofa de ovo", "Misto"),
    new AlimentoModel("Frango com quiabo", "Proteina"),
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
