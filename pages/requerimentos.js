const requirementsLocalStyles = new CSSStyleSheet();

requirementsLocalStyles.replaceSync(`
  
`);

class RequirementsPage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, requirementsLocalStyles];
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
      <table-component dataFnKey="requirementsDataForTable"></table-component>
    `;
  }
};

customElements.define("requerimentos-page", RequirementsPage);