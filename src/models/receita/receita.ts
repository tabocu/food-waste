import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";
import { QuantidadeModel } from "../alimento/alimento";
import { Key } from "../../utils/keygen";

export
  class ReceitaModel
  extends IndexedModel<ReceitaModel>
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
    receitaModelCopy.key = this.key;

    this.quantidades.forEach((quantidade) => { receitaModelCopy.quantidades.push(quantidade.clone()) } );

    return receitaModelCopy;
  }
}

export
  class PrecoModel
  extends IndexedModel<PrecoModel>
  implements ClonableModel<PrecoModel> {

  constructor(
    public receitaKey: Key<ReceitaModel>,
    public valor: number) {
    super();
  }

  clone(): PrecoModel {
    let precoModelCopy = new PrecoModel(this.receitaKey, this.valor);
    precoModelCopy.key = this.key;

    return precoModelCopy;
  }
 }