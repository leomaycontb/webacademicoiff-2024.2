const homepageLocalStyles = new CSSStyleSheet();

homepageLocalStyles.replaceSync(`
  #calendar-and-tasks {
    margin-top: 3%;
    justify-content: space-between !important;
    gap: 100px;
  }

  custom-calendar {
    width: 50%;
  }

  #tasks {
    width: 50%;
  }
`);

class Homepage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, homepageLocalStyles];
    this.registroApi = RegistroApi.instance;
    if(!this.registroApi.loggedUser) {
      window.location.href = "login.html";
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <section id="calendar-and-tasks" class="container centralized">
        <custom-calendar></custom-calendar>
        <section id="tasks"><h1>Tarefas</h1></section>
      </section>
    `
  }
}

customElements.define('home-page', Homepage);