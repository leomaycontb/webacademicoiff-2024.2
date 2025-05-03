// Implementação mockada usando localStorage

const mockedUsers = [
  {
    name: "Administrativo",
    password: "admin123",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  }
]

class RegistroApi {
  static _instance;

  #users;
  #token;
  loggedUser;


  constructor() {
    this.#users = this.#loadUsers();
    this.#token = this.#loadToken();
    this.loggedUser = this.#loadLoggedUser();
  }

  #loadLoggedUser() {
    if(!this.#token) return null;
    const [name, _] = atob(this.#token).split(":");
    return this.#users.find(u => u.name == name);
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
    this.#token = token;
    localStorage.setItem("token", token);

    return {success: true, message: 'Autenticado'};
  }
}