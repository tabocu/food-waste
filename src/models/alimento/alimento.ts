import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";

export
  class AlimentoModel 
  extends IndexedModel
  implements ClonableModel<AlimentoModel> {

  constructor(
    public nome?: string,
    public tipo?: string) {
      super();
  }

  clone() : AlimentoModel {
    let alimentoModelCopy = new AlimentoModel();
    alimentoModelCopy.key = this.key;
    alimentoModelCopy.nome = this.nome;
    alimentoModelCopy.tipo = this.tipo;

    return alimentoModelCopy;
  }
}

export
  class QuantidadeModel
  implements ClonableModel<QuantidadeModel> {

  constructor(
    public readonly alimentoKey: number,
    public readonly quantidade: number) { }

  clone() : QuantidadeModel {
    return new QuantidadeModel(this.alimentoKey, this.quantidade);
  }
}