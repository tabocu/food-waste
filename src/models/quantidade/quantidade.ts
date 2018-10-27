import { ClonableModel } from "../utils/clonable";
import { Key } from "../../utils/keygen";

export
    class QuantidadeModel<T>
    implements ClonableModel<QuantidadeModel<T>> {

    constructor(
        public readonly key: Key<T>,
        public quantidade: number) { }

    clone(): QuantidadeModel<T> {
        return new QuantidadeModel<T>(this.key, this.quantidade);
    }
}