const headerComponentLocalStyles = new CSSStyleSheet();

headerComponentLocalStyles.replaceSync(`
  header {
    padding: 0.5% 3%;
    justify-content: space-between !important;
    border-bottom: 1px solid #D9D9D9;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 2px;
  }

  li a {
    height: 100%;
    width: 100%;
    color: #493159;
    text-decoration: none;
    gap: 5px;
    padding: 0 15px;
    border-radius: 10px;
  }

  li a.active {
    background-color: #493159;
    color: white;
  }

  button {
    background: none;
    outline: none;
    cursor: pointer;
    border: 1px solid #493159;
    padding: 10% 15%;
    border-radius: 8px;
  }

  #avatar {
    height: 35px;
    width: 35px;
    object-fit: cover;
    border-radius: 50%;
  }

  #logo {
    width: 70px;
    cursor: pointer;
  }
`);

class HeaderComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, headerComponentLocalStyles];
    this.registroApi = RegistroApi.instance;
    this.navLinks = [
      {title: "Registro Escolar", url: "registro-escolar.html"},
      {title: "Horário", url: "horario.html"},
      {title: "Ensino", url: "ensino.html"},
      {title: "Ajuda", url: "ajuda.html"},
      {title: "Configuração", url: "configuracao.html"}
    ];
  }

  get activeUrl() {
    return this.getAttribute('activeUrl');
  }

  set activeUrl(val) {
    this.setAttribute('activeUrl', val);
  }

  connectedCallback() {
    this.render();

    const logoutButton = this.shadow.querySelector("button");
    logoutButton.onclick = this.logout.bind(this);
  }

  logout() {
    this.registroApi.logout();
    window.location.href = "login.html";
  }

  render() {
    this.shadow.innerHTML = `
      <header class="centralized">
        <img onclick="window.location.href='homepage.html';" id="logo" src="assets/logo.jpeg" alt="logo acad"/>
        <nav>
          <ul>
            ${this.navLinks.map(link => `
                <li>
                  <a href="${link.url}" class="centralized ${this.activeUrl == link.url ? 'active' : ''}">
                    <img src="assets/${this.activeUrl == link.url ? 'header-arrow-white.svg' : 'header-arrow.svg'}"/>
                    ${link.title}
                  </a>
                </li>
            `).join('')}
              <li>
                <button class="centralized">
                  <img id="avatar" src="${this.registroApi.loggedUser.avatarUrl}" alt="avatar"/>
                  <img src="assets/logout-arrow.svg"/>
                </button>
              </li>
          </ul>
        </nav>
      </header>
    `
  }
}

customElements.define('header-component', HeaderComponent);