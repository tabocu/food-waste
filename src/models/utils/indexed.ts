import { Key } from "../../utils/keygen";

export class IndexedModel<T> {

    protected key: Key<T> = null;

    constructor() {};

    setKey(key: Key<T>) {
        this.key = key;
    }

    getKey(): Key<T> {
        return this.key;
    }
}