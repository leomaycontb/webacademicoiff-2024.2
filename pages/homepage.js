const homepageLocalStyles = new CSSStyleSheet();

homepageLocalStyles.replaceSync(`
  #calendar-and-tasks {
    margin-top: 3%;
    display: flex;
    justify-content: space-between;
    gap: 100px;
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
      <section id="calendar-and-tasks" class="container">
        <custom-calendar></custom-calendar>
        <tasks-component></tasks-component>
      </section>
    `
  }
}

customElements.define('home-page', Homepage);