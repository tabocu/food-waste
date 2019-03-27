import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";
import { QuantidadeModel } from "../quantidade/quantidade";
import { AlimentoModel } from "../alimento/alimento";

export
  class ReceitaModel
  extends IndexedModel
  implements ClonableModel<ReceitaModel> {

  mQuantidades: QuantidadeModel<AlimentoModel>[] = [];

  constructor(public mNome?: string) {
    super();
  }

  getQuantidadeTotal() : number {
    let quantidadeTotal: number = 0;
    this.mQuantidades.forEach((quantidade) => { quantidadeTotal += quantidade.mQuantidade; });
    return quantidadeTotal;
  }

  clone(): ReceitaModel {
    let receitaModelCopy = new ReceitaModel(this.mNome);
    receitaModelCopy.mId = this.mId;

    this.mQuantidades.forEach((quantidade) => { receitaModelCopy.mQuantidades.push(quantidade.clone()) } );

    return receitaModelCopy;
  }
}

export
  class PrecoModel
  extends IndexedModel
  implements ClonableModel<PrecoModel> {

  constructor(
    public mReceitaId: number = IndexedModel.INVALID_ID,
    public mValor: number = 0) {
    super();
  }

  clone(): PrecoModel {
    let precoModelCopy = new PrecoModel(this.mReceitaId, this.mValor);
    precoModelCopy.mId = this.mId;

    return precoModelCopy;
  }
 }