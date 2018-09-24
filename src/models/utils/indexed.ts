export abstract class IndexedModel {

    protected key: number = null;

    constructor() {};

    setKey(key: number) {
        this.key = key;
    }

    getKey(): number {
        return this.key;
    }

    abstract copy();
}