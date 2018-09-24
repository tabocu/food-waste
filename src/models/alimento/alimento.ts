import { IndexedModel } from "../utils/indexed";

export class AlimentoModel extends IndexedModel {

  constructor(
    public nome?: string,
    public tipo?: string) {
      super();
  }

  copy() : AlimentoModel {
    let alimentoModelCopy = new AlimentoModel();
    alimentoModelCopy.key = this.key;
    alimentoModelCopy.nome = this.nome;
    alimentoModelCopy.tipo = this.tipo;

    return alimentoModelCopy;
  }
}

export class QuantidadeModel {
  constructor(
    public readonly alimentoKey: number,
    public readonly quantidade: number) { }

  copy() : QuantidadeModel {
    return new QuantidadeModel(this.alimentoKey, this.quantidade);
  }
}