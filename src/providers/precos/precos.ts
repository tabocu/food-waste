import { Injectable } from '@angular/core';
import { PrecoModel } from '../../models/receita/receita';
import { KeyGen, Key } from '../../utils/keygen';

@Injectable()
export class PrecosProvider {

  private keyGen: KeyGen<PrecoModel> = KeyGen.createKeyGen<PrecoModel>();
  private precos: PrecoModel[] = [];

  constructor() {}

  private getIndex(key: Key<PrecoModel>): number {
    return this.precos.findIndex((preco) => { return preco.getKey() == key; });
  }

  create(preco: PrecoModel): Key<PrecoModel> {
    let key = this.keyGen.getNextKey();
    preco.setKey(key);
    this.precos.push(preco);
    return key;
  }

  retrieve(key: Key<PrecoModel>): PrecoModel {
    return this.precos[this.getIndex(key)].clone();
  }

  retrieveAll(): PrecoModel[] {
    return this.precos;
  }

  update(preco: PrecoModel) {
    this.precos[this.getIndex(preco.getKey())] = preco;
  }

  delete(key: Key<PrecoModel>) {
    delete this.precos[this.getIndex(key)];
  }
}
