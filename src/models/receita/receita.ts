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

  getQuantidadeTotal() : number {
    let quantidadeTotal: number = 0;
    this.quantidades.forEach((quantidade) => { quantidadeTotal += quantidade.quantidade; });
    return quantidadeTotal;
  }

  clone(): ReceitaModel {
    let receitaModelCopy = new ReceitaModel(this.nome);

    this.quantidades.forEach((quantidade) => { receitaModelCopy.quantidades.push(quantidade.clone()) } );

    return receitaModelCopy;
  }
}