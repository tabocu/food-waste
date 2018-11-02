import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";
import { QuantidadeModel } from "../quantidade/quantidade";
import { Key, KeyGen } from "../../utils/keygen";
import { AlimentoModel } from "../alimento/alimento";

export
  class ReceitaModel
  extends IndexedModel<ReceitaModel>
  implements ClonableModel<ReceitaModel> {

  quantidades: QuantidadeModel<AlimentoModel>[] = [];

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
    public receitaKey: Key<ReceitaModel> = KeyGen.getInvalidKey<ReceitaModel>(),
    public valor: number = 0) {
    super();
  }

  clone(): PrecoModel {
    let precoModelCopy = new PrecoModel(this.receitaKey, this.valor);
    precoModelCopy.key = this.key;

    return precoModelCopy;
  }
 }