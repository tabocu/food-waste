import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";
import { QuantidadeModel } from "../alimento/alimento";

export
  class ReceitaModel
  extends IndexedModel
  implements ClonableModel<ReceitaModel> {

  quantidades: QuantidadeModel[] = [];

  constructor(public nome?: string) {
    super();
  }

  clone(): ReceitaModel {
    let receitaModelCopy = new ReceitaModel(this.nome);

    this.quantidades.forEach((quantidade) => { receitaModelCopy.quantidades.push(quantidade.clone()) } );

    return receitaModelCopy;
  }
}