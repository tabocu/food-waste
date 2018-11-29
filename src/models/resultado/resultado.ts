import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";

import { ReceitaModel } from "../receita/receita";
import { QuantidadeModel } from "../quantidade/quantidade";
import { AlimentoModel } from "../alimento/alimento";

export
  class ResultadoModel
  extends IndexedModel<ResultadoModel>
  implements ClonableModel<ResultadoModel> {

  quantidades: QuantidadeModel<ReceitaModel>[] = [];
  sobras: QuantidadeModel<AlimentoModel>[] = [];
  lucro: number;

  constructor() {
    super();
  }

  clone(): ResultadoModel {
    let resultadoModelCopy = new ResultadoModel();
    resultadoModelCopy.key = this.key;
    resultadoModelCopy.lucro = this.lucro;

    this.quantidades.forEach((quantidade: QuantidadeModel<ReceitaModel>) => { resultadoModelCopy.quantidades.push(quantidade.clone()) });
    this.sobras.forEach((sobra: QuantidadeModel<AlimentoModel>) => { resultadoModelCopy.sobras.push(sobra.clone()) });

    return resultadoModelCopy;
  }
}