import { IndexedModel } from "../utils/indexed";
import { ClonableModel } from "../utils/clonable";

export
  class AlimentoModel 
  extends IndexedModel
  implements ClonableModel<AlimentoModel> {

  constructor(
    public mNome?: string,
    public mTipo?: string) {
      super();
  }

  clone() : AlimentoModel {
    let alimentoModelCopy = new AlimentoModel();
    alimentoModelCopy.mId = this.mId;
    alimentoModelCopy.mNome = this.mNome;
    alimentoModelCopy.mTipo = this.mTipo;

    return alimentoModelCopy;
  }
}
