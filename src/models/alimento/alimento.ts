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

  toJSON() : any {
    let json = {
      id: this.getId(),
      nome: this.mNome,
      tipo: this.mTipo,
    }
    return json;
  }

  clone() : AlimentoModel {
    let alimentoModelCopy = new AlimentoModel();
    alimentoModelCopy.mId = this.mId;
    alimentoModelCopy.mNome = this.mNome;
    alimentoModelCopy.mTipo = this.mTipo;

    return alimentoModelCopy;
  }

  static fromJSON(json: any) : AlimentoModel {
    let alimentoModel = new AlimentoModel(json.nome, json.tipo);
    alimentoModel.setId(Number.parseInt(json.id));
    return alimentoModel;
  }

  static fromJSONList(jsonList: any) : AlimentoModel[] {
    let alimentoModelList: AlimentoModel[] = [];
    for (let json in jsonList)
    {
      console.log(jsonList[json]);
      let alimentoModel: AlimentoModel = AlimentoModel.fromJSON(jsonList[json]);
      alimentoModelList.push(alimentoModel);
    }
    return alimentoModelList;
  }
}