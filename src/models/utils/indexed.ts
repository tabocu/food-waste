export class IndexedModel {

  public static readonly INVALID_ID: number = -1;
  protected mId: number = IndexedModel.INVALID_ID;

  constructor() {};

  setId(id: number) {
    //assert(id >= 0 || id == IndexedModel.INVALID_ID, "Invalid ID");
    this.mId = id;
  }

  getId(): number {
    return this.mId;
  }

  isValid(): boolean {
    return this.mId != IndexedModel.INVALID_ID;
  }
}