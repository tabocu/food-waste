import { IndexedModel } from "../utils/indexed";
import { QuantidadeModel } from "../alimento/alimento";

export class ReceitaModel extends IndexedModel {

  quantidades: QuantidadeModel[] = [];

  constructor(public nome?: string) {
    super();
  }

  copy(): ReceitaModel {
    let receitaModelCopy = new ReceitaModel();

    return receitaModelCopy;
  }
}