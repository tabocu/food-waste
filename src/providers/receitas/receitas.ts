import { Injectable } from '@angular/core';

import { ReceitaModel } from '../../models/receita/receita'
import { QuantidadeModel } from '../../models/alimento/alimento';

@Injectable()
export class ReceitasProvider {

  private keyCounter: number = 0;
  private receitas: ReceitaModel[] = [];

  constructor() {
    let recp1 = new ReceitaModel("Tropeiro");
    recp1.quantidades.push(new QuantidadeModel(1, 200));
    recp1.quantidades.push(new QuantidadeModel(2, 200));
    recp1.quantidades.push(new QuantidadeModel(5, 200));
    this.create(recp1);

    let recp2 = new ReceitaModel("Mixido");
    recp2.quantidades.push(new QuantidadeModel(0, 200));
    recp2.quantidades.push(new QuantidadeModel(1, 200));
    recp2.quantidades.push(new QuantidadeModel(3, 200));
    recp2.quantidades.push(new QuantidadeModel(5, 200));
    this.create(recp2);

    this.create(new ReceitaModel("Fricasse"));
    this.create(new ReceitaModel("Macarrão na chapa"));
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
