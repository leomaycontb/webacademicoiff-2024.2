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

const mockedTeachers = [
  {
    name: "Professor 1",
    hasSentDiary: true
  },
  {
    name: "Professor 2",
    hasSentDiary: false
  },
  {
    name: "Professor 3",
    hasSentDiary: false
  },
  {
    name: "Professor 4",
    hasSentDiary: false
  },
  {
    name: "Professor 5",
    hasSentDiary: false
  },
]

const mockedChartData = {
  YaxisBreakpoints: [
    {
      percent: 5,
      caption: '500'
    },
    {
      percent: 10,
      caption: '1k'
    },
    {
      percent: 20,
      caption: '2k'
    },
    {
      percent: 50,
      caption: '5k'
    },
    {
      percent: 100,
      caption: '10k'
    }
  ],
  segmentCaptions: [
    {
      title: "Ativos",
      color: "#493159"
    },
    {
      title: "Engressando",
      color: "#8B62CD"
    },
    {
      title: "Formando",
      color: "#E0C6FD"
    },
    {
      title: "Trancados",
      color: "#F0E5FC"
    }
  ],
  bars: [
    {
      percent: 27,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 15,
          color: '#E0C6FD'
        },
        {
          percent: 25,
          color: '#8B62CD'
        },
        {
          percent: 50,
          color: '#493159'
        },
      ],
      caption: '2022.1'
    },
    {
      percent: 62,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 30,
          color: '#E0C6FD'
        },
        {
          percent: 20,
          color: '#8B62CD'
        },
        {
          percent: 40,
          color: '#493159'
        },
      ],
      caption: '2022.2'
    },
    {
      percent: 69,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 30,
          color: '#E0C6FD'
        },
        {
          percent: 20,
          color: '#8B62CD'
        },
        {
          percent: 40,
          color: '#493159'
        },
      ],
      caption: '2023.1'
    },
    {
      percent: 95,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 30,
          color: '#E0C6FD'
        },
        {
          percent: 20,
          color: '#8B62CD'
        },
        {
          percent: 40,
          color: '#493159'
        },
      ],
      caption: '2023.2'
    },
    {
      percent: 100,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 30,
          color: '#E0C6FD'
        },
        {
          percent: 20,
          color: '#8B62CD'
        },
        {
          percent: 40,
          color: '#493159'
        },
      ],
      caption: '2024.1'
    },
    {
      percent: 71,
      segments: [
        {
          percent: 10,
          color: '#F0E5FC'
        },
        {
          percent: 30,
          color: '#E0C6FD'
        },
        {
          percent: 20,
          color: '#8B62CD'
        },
        {
          percent: 40,
          color: '#493159'
        },
      ],
      caption: '2024.2'
    }
  ]
}

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

  get teachers() {
    if(!this.loggedUser) {
      return {success: false, message: 'Você precisa estar autenticado'};
    }
    return {success: true, data: mockedTeachers};
  }

  get chartData() {
    if(!this.loggedUser) {
      return {success: false, message: 'Você precisa estar autenticado'};
    }
    return {success: true, data: mockedChartData};
  }
}