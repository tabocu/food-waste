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
}