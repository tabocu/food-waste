export abstract class KeyGen<T> {
  abstract getNextKey(): Key<T>;
  abstract getKey(id: number): Key<T>;
  abstract resetKeys();

  static getInvalidKey<T>() : Key<T> {
    return new InvalidKeyImp<T>();
  }

  static createKeyGen<T>(): KeyGen<T> {
    return new KeyGenImp<T>();
  }
}

export interface Key<T> { 
  isValid(): boolean;
  getId(): number;
}

class KeyGenImp<T> implements KeyGen<T> {

  keySet: Set<KeyImp<T>> = new Set<KeyImp<T>>();
  keyMap = {};
  counter: number = 0;

  constructor() {}

  getKey(id: number): Key<T> {
    return (id in this.keyMap)
       ? this.keyMap[id]
       : new InvalidKeyImp<T>();
  }

  getNextKey(): Key<T> {
    let key = new KeyImp<T>(this, this.counter);
    this.keyMap[this.counter] = key;
    this.counter++;
    this.keySet.add(key);
    return key;
  }

  resetKeys() {
    this.keySet.clear();
  }
}

class KeyImp<T> implements Key<T> {
  
  constructor(
    private keyGen: KeyGenImp<T>,
    private id: number) {}

  isValid(): boolean {
    return this.keyGen.keySet.has(this);
  }

  getId(): number {
    return this.id;
  }
}

class InvalidKeyImp<T> implements Key<T> {
  isValid(): boolean { return false; }
  getId(): number { return -1; }
}