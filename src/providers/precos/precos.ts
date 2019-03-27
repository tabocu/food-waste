import { Injectable } from '@angular/core';
import { PrecoModel } from '../../models/receita/receita';

@Injectable()
export class PrecosProvider {

  private mPrecos: PrecoModel[] = [];
  private mCounter: number = 0;

  constructor() {}

  private getIndex(id: number): number {
    return this.mPrecos.findIndex((preco) => { return preco.getId() == id; });
  }

  create(preco: PrecoModel): number {
    preco.setId(this.mCounter);
    this.mPrecos.push(preco);
    ++this.mCounter;
    return preco.getId();
  }

  retrieve(id: number): PrecoModel {
    return this.mPrecos[this.getIndex(id)].clone();
  }

  retrieveAll(): PrecoModel[] {
    return this.mPrecos;
  }

  update(preco: PrecoModel) {
    this.mPrecos[this.getIndex(preco.getId())] = preco;
  }

  delete(id: number) {
    delete this.mPrecos[this.getIndex(id)];
  }
}