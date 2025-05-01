const localStyles = new CSSStyleSheet();
localStyles.replaceSync(`
  
`);

class Login extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, localStyles];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <main class="container">
        <figure>
          <figcaption>Logo da instituição</figcaption>
        </figure>
        <section>
          <h1>Faça seu login</h1>
        </section>
      </main>
    `
  }
}

customElements.define('login-page', Login);