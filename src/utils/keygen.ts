export abstract class KeyGen<T> {
  abstract getNextKey(): Key<T>;
  abstract resetKeys();

  static getInvalidKey<T>() : Key<T> {
    return new InvalidKeyImp<T>();
  }

  static createKeyGen<T>(): KeyGen<T> {
    return new KeyGenImp<T>();
  }
}

export interface Key<T> { isValid(): boolean; }

class KeyGenImp<T> implements KeyGen<T> {

  keySet: Set<KeyImp<T>> = new Set <KeyImp<T>>();

  constructor() {}

  getNextKey() : Key<T> {
    let key = new KeyImp<T>(this);
    this.keySet.add(key);
    return key;
  }

  resetKeys() {
    this.keySet.clear();
  }
}

class KeyImp<T> implements Key<T> {
  
  constructor(private keyGen: KeyGenImp<T>) {}

  isValid(): boolean {
    return this.keyGen.keySet.has(this);
  }
}

class InvalidKeyImp<T> implements Key<T> {
  isValid(): boolean { return false; }
}