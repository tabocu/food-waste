import { Injectable } from '@angular/core';

import { ReceitaModel } from '../../models/receita/receita'
import { KeyGen, Key } from '../../utils/keygen';

@Injectable()
export class ReceitasProvider {

  private keyGen: KeyGen<ReceitaModel> = KeyGen.createKeyGen<ReceitaModel>();
  private receitas: ReceitaModel[] = [];

  constructor() {}

  private getIndex(key: Key<ReceitaModel>) : number {
    return this.receitas.findIndex((alimento) => { return alimento.getKey() == key; });
  }

  create(alimento: ReceitaModel): Key<ReceitaModel> {
    let key = this.keyGen.getNextKey();
    alimento.setKey(key);
    this.receitas.push(alimento);
    return key;
  }

  retrieve(key: Key<ReceitaModel>) : ReceitaModel {
    return this.receitas[this.getIndex(key)].clone();
  }

  retrieveAll(): ReceitaModel[] {
    return this.receitas;
  }

  update(alimento: ReceitaModel) {
    this.receitas[this.getIndex(alimento.getKey())] = alimento;
  }

  delete(key: Key<ReceitaModel>) {
    delete this.receitas[this.getIndex(key)];
  }

  retrieveKey(id: number): Key<ReceitaModel> {
    return this.keyGen.getKey(id);
  }
}
