import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";

import { ReceitaModel } from "../receita/receita";
import { QuantidadeModel } from "../quantidade/quantidade";
import { AlimentoModel } from "../alimento/alimento";

export
  class ResultadoModel
  extends IndexedModel
  implements ClonableModel<ResultadoModel> {

  mQuantidades: QuantidadeModel<ReceitaModel>[] = [];
  mSobras: QuantidadeModel<AlimentoModel>[] = [];
  mLucro: number;

  constructor() { super(); }

  clone(): ResultadoModel {
    let resultadoModelCopy = new ResultadoModel();
    resultadoModelCopy.mId = this.mId;
    resultadoModelCopy.mLucro = this.mLucro;

    this.mQuantidades.forEach((quantidade: QuantidadeModel<ReceitaModel>) => { resultadoModelCopy.mQuantidades.push(quantidade.clone()) });
    this.mSobras.forEach((sobra: QuantidadeModel<AlimentoModel>) => { resultadoModelCopy.mSobras.push(sobra.clone()) });

    return resultadoModelCopy;
  }
}