const homepageLocalStyles = new CSSStyleSheet();

homepageLocalStyles.replaceSync(`
  main {
    padding-bottom: 5%;
  }

  #calendar-and-tasks {
    display: flex;
    justify-content: space-between;
    gap: 100px;
    margin-top: 3%;
  }

  custom-calendar {
    width: 50%;
  }

  tasks-component {
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
      <main class="container">
        <section id="calendar-and-tasks">
          <custom-calendar></custom-calendar>
          <tasks-component></tasks-component>
        </section>
        <dashboard-component></dashboard-component>
      </main>
    `
  }
}

customElements.define('home-page', Homepage);