const tasksComponentLocalStyles = new CSSStyleSheet();

tasksComponentLocalStyles.replaceSync(`
  #tasks-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 3%;
  }

  #tasks-header h1 {
    font-size: 150%;
    color: #F9CF64;
  }

  #tasks-header h2 {
    font-weight: 100;
    font-size: 150%;
    color: #493159;
  }

  #tasks-table {
    width: 100%;
    border-collapse: collapse;
  }

  thead, tbody {
    background: #F5F5F5;
  }

  th, td {
    padding: 2%;
    font-size: 100%;
  }

  td {
    padding: 5% 5%;
    text-align: center;
  }

  th:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  th:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  thead:after {
    content: "";
    display: block;
    height: 1em;
    width: 100%;
    background: white;
  }

  tbody tr:first-child td:first-child  {
    border-top-left-radius: 8px;
  }

  tbody tr:first-child td:last-child  {
    border-top-right-radius: 8px;
  }

  tbody tr:last-child td:first-child  {
    border-bottom-left-radius: 8px;
  }

  tbody tr:last-child td:last-child  {
    border-bottom-right-radius: 8px;
  }

  .checkbox {
    float: left;
    width: 16px;
    height: 16px;
    border: 2px solid #493159;
    border-radius: 5px;
  }

  .checkbox img {
    width: 90%;
    visibility: hidden;
  }

  .checkbox-checked img {
    visibility: visible;
  }

  span {
    font-weight: bold;
  }
  
  .title {
    float: right;
    color: #493159;
  }

  .done {
    color: #493159;
  }

  .pending {
    color: #EC9632;
  }

  .avatar {
    height: 35px;
    width: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
`)

class TasksComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, tasksComponentLocalStyles];
    this.currentDate = new Date();
    this.registroApi = RegistroApi.instance;
  }

  connectedCallback() {
    this.render();
  }

  get tasks() {
    const {success, data} = this.registroApi.tasks;
    if(!success) {
      window.location.href = "login.html"
    }
    return data;
  }

  render() {
    const month = this.currentDate.toLocaleString("pt-BR", { month: "long" });

    this.shadow.innerHTML = `
      <section id="tasks">
        <div id="tasks-header">
          <h1>HOJE</h1><h2>${this.currentDate.getDate()} ${month.charAt(0).toUpperCase() + month.slice(1)}</h2>
        </div>
        <table id="tasks-table">
            <thead>
            <tr>
              <th>Tarefas</th>
              <th>Atribuído</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${this.tasks.map(task => `
              <tr>
                <td>
                  <div class="checkbox${task.status == 'done' ? ' checkbox-checked ' : ' '}centralized">
                    <img src="assets/checkbox-checked.svg" alt="checked"/>
                  </div>
                  <span class="title">${task.title}</span>
                </td>
                <td>
                  <img class="avatar" src="${this.registroApi.loggedUser.avatarUrl}" alt="avatar"/>
                </td>
                <td>
                  <span class="${task.status}">${({done: "Entregue", pending: "Pendente"})[task.status]}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </section>
    `;
  }
}

customElements.define("tasks-component", TasksComponent);
