// Implementação mockada usando localStorage

const mockedUsers = [
  {
    name: "Administrativo",
    password: "admin123"
  }
]

class RegistroApi {
  static _instance;

  #users;
  token;

  constructor() {
    this.#users = this.#loadUsers();
    this.token = this.#loadToken();
  }

  #loadToken() {
    return localStorage.getItem("token");
  }

  #loadUsers() {
    const savedUsers = localStorage.getItem("users");
    if(savedUsers) {
      return JSON.parse(atob(savedUsers));
    }
    localStorage.setItem("users", btoa(JSON.stringify(mockedUsers)));
    return {...mockedUsers};
  }

  static get instance() {
    if(!this._instance) {
      this._instance = new RegistroApi();
    }
    return this._instance;
  }

  login(name, password) {
    const user = this.#users.find(u => u.name == name);

    if(!user) {
      return {success: false, message: 'Usuário não encontrado'};
    }

    if(!(user.password == password)) {
      return {success: false, message: 'Senha inválida'};
    }

    const token = btoa(`${name}:${password}`);
    this.token = token;
    localStorage.setItem("token", token);

    return {success: true, message: 'Autenticado'};
  }
}