import { Injectable } from '@angular/core';
import { PrecoModel } from '../../models/receita/receita';

@Injectable()
export class PrecosProvider {

  private keyCounter: number = 0;
  private precos: PrecoModel[] = [];

  constructor() {
    this.create(new PrecoModel(0, 4.75));
    this.create(new PrecoModel(2, 7.15));
  }

  private getNextKey(): number {
    return this.keyCounter++;
  }

  private getIndex(key: number): number {
    return this.precos.findIndex((preco) => { return preco.getKey() == key; });
  }

  create(preco: PrecoModel) {
    preco.setKey(this.getNextKey());
    this.precos.push(preco);
  }

  retrieve(key: number): PrecoModel {
    return this.precos[this.getIndex(key)].clone();
  }

  retrieveAll(): PrecoModel[] {
    return this.precos;
  }

  update(preco: PrecoModel) {
    this.precos[this.getIndex(preco.getKey())] = preco;
  }

  delete(key: number) {
    delete this.precos[this.getIndex(key)];
  }
}
