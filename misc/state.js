class GlobalState {
  static instance = null;
  userToken = null;
  
  constructor() { }

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new GlobalState();

    return this.instance;
  }
}