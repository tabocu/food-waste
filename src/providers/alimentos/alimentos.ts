import { Injectable } from '@angular/core';

import { AlimentoModel } from '../../models/alimento/alimento'
import { KeyGen, Key } from '../../utils/keygen';

@Injectable()
export class AlimentosProvider {

  private keyGen: KeyGen<AlimentoModel> = KeyGen.createKeyGen<AlimentoModel>();
  private alimentos: AlimentoModel[] = [];

  constructor() {}

  private getIndex(key: Key<AlimentoModel>) : number {
    return this.alimentos.findIndex((alimento) => { return alimento.getKey() == key; });
  }

  create(alimento: AlimentoModel): Key<AlimentoModel> {
    let key = this.keyGen.getNextKey();
    alimento.setKey(key);
    this.alimentos.push(alimento);
    return key;
  }

  retrieve(key: Key<AlimentoModel>) : AlimentoModel {
    return this.alimentos[this.getIndex(key)].clone();
  }

  retrieveAll(): AlimentoModel[] {
    return this.alimentos;
  }

  retrieveKey(id: number): Key<AlimentoModel> {
    return this.keyGen.getKey(id);
  }

  update(alimento: AlimentoModel) {
    this.alimentos[this.getIndex(alimento.getKey())] = alimento;
  }

  delete(key: Key<AlimentoModel>) {
    delete this.alimentos[this.getIndex(key)];
  }
}
