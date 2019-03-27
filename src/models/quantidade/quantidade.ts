import { ClonableModel } from "../utils/clonable";

export
    class QuantidadeModel<T>
    implements ClonableModel<QuantidadeModel<T>> {

    constructor(
        public readonly mId: number,
        public mQuantidade: number) { }

    clone(): QuantidadeModel<T> {
        return new QuantidadeModel<T>(this.mId, this.mQuantidade);
    }
}