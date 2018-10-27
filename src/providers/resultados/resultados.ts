import { Injectable } from '@angular/core';

import { KeyGen } from '../../utils/keygen';
import { ResultadoModel } from '../../models/resultado/resultado';

@Injectable()
export class ResultadosProvider {

  private keyGen: KeyGen<ResultadoModel> = KeyGen.createKeyGen<ResultadoModel>();
  private receitas: ResultadoModel[] = [];

  constructor() {}

}
