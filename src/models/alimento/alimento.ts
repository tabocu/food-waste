export class AlimentoModel {

  private key: number = null;
  
  constructor(
    public nome?: string,
    public tipo?: string) {}

  setKey(key: number) {
    this.key = key;
  }

  getKey() : number {
    return this.key;
  }

  copy() : AlimentoModel {
    let alimentoModelCopy = new AlimentoModel();
    alimentoModelCopy.key = this.key;
    alimentoModelCopy.nome = this.nome;
    alimentoModelCopy.tipo = this.tipo;

    return alimentoModelCopy;
  }
}