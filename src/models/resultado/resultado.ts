import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";

import { ReceitaModel } from "../receita/receita";
import { QuantidadeModel } from "../quantidade/quantidade";

export
  class ResultadoModel
  extends IndexedModel<ResultadoModel>
  implements ClonableModel<ResultadoModel> {

  quantidades: QuantidadeModel<ReceitaModel>[] = [];
  lucro: number;

  constructor() {
    super();
  }

  clone(): ResultadoModel {
    let resultadoModelCopy = new ResultadoModel();
    resultadoModelCopy.key = this.key;
    resultadoModelCopy.lucro = this.lucro;

    this.quantidades.forEach((quantidade) => { resultadoModelCopy.quantidades.push(quantidade.clone()) });

    return resultadoModelCopy;
  }
}