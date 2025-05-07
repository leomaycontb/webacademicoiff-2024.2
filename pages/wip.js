const wipPageLocalSyles = new CSSStyleSheet();

wipPageLocalSyles.replaceSync(`
  main {
    flex-direction: column;
    margin-top: 6% !important;
    color: #493159;
  }

  h1 {
    font-size: 240%;
  }

  p {
    font-size: 150%;
    font-style: italic;
  }
`);

class WipPage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, wipPageLocalSyles];
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
      <main class="container centralized">
        <img src="assets/truck.svg" alt="construction"/>
        <h1>Em construção</h1>
        <p>Volte logo mais!</p>
      </main>
    `;
  }
}

customElements.define('wip-page', WipPage);