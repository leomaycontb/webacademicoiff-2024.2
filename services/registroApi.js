// Implementação mockada usando localStorage

const mockedUsers = [
  {
    name: "Administrativo",
    password: "admin123",
    avatarUrl: "https://i.pravatar.cc/150?u=fake20@pravatar.com"
  }
]

const mockedEvents = [
  {
    title: "Feriado - dia do trabalhador",
    dateRange: {init: new Date("2025-05-01T00:00:00-03:00"), end: new Date("2025-05-02T00:00:00-03:00")},
    workday: false
  },
  {
    title: "P2 - Gerência de projetos",
    dateRange: {init: new Date("2025-05-07T00:00:00-03:00"), end: new Date("2025-05-07T00:00:00-03:00")},
    workday: true
  },
  {
    title: "Sábado letivo - Informática",
    dateRange: {init: new Date("2025-05-10T00:00:00-03:00"), end: new Date("2025-05-10T00:00:00-03:00")},
    workday: true
  },
  {
    title: "Verificação suplementar - integrado",
    dateRange: {init: new Date("2025-05-19T00:00:00-03:00"), end: new Date("2025-05-23T00:00:00-03:00")} ,
    workday: true
  },
  {
    title: "Conselho de classe - integrado",
    dateRange: {init: new Date("2025-05-26T00:00:00-03:00"), end: new Date("2025-05-30T00:00:00-03:00")} ,
    workday: true
  },
  {
    title: "Férias - segundo período",
    dateRange: {init: new Date("2025-06-02T00:00:00-03:00"), end: new Date("2025-06-06T00:00:00-03:00")} ,
    workday: false
  }
]

const mockedTasks = [
  {
    title: "Matrícula de disciplinas",
    status: "pending"
  },
  {
    title: "Matrícula de disciplinas",
    status: "pending"
  },
  {
    title: "Matrícula de disciplinas",
    status: "done"
  },
  {
    title: "Matrícula de disciplinas",
    status: "done"
  },
  {
    title: "Matrícula de disciplinas",
    status: "done"
  },
  {
    title: "Matrícula de disciplinas",
    status: "done"
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
    return [...mockedUsers.map(mu => ({...mu}))];
  }

  static get instance() {
    if(!this._instance) {
      this._instance = new RegistroApi();
    }
    return this._instance;
  }

  logout() {
    localStorage.removeItem("token");
    this.loggedUser = null;
    this.#token = null;
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

  get events() {
    if(!this.loggedUser) {
      return {success: false, message: 'Você precisa estar autenticado'};
    }
    return {success: true, data: mockedEvents};
  }

  get tasks() {
    if(!this.loggedUser) {
      return {success: false, message: 'Você precisa estar autenticado'};
    }
    return {success: true, data: mockedTasks};
  }
}