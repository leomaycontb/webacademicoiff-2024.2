const homepageLocalStyles = new CSSStyleSheet();

homepageLocalStyles.replaceSync(`
  
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
      <h1>Homepage</h1>
    `
  }
}

customElements.define('home-page', Homepage);