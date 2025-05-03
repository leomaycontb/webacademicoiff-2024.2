const modalDialogLocalStyles = new CSSStyleSheet();

modalDialogLocalStyles.replaceSync(`
  #modal-dialog-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(255,255,255,.5);
    z-index: 1000;
  }

  #modal-dialog-card {
    background-color: white;
    padding: 2% 5%;
    text-align: center;
    border-radius: 10px;
    border-width: 24px 2px 2px;
    border-style: solid;
  }

  .confirm {
    border-color: #493159;
    color: #493159;
  }

  .error {
    border-color: #DC143C;
    color: #DC143C;
  }

  h2 {
    font-size: 125%;
    margin-top: 2%;
  }

  #modal-dialog-buttons {
    margin-top: 8%;
  }
`);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, modalDialogLocalStyles];
  }

  connectedCallback() {
    this.render();
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get subtitle() {
    return this.getAttribute('subtitle');
  }

  set subtitle(val) {
    this.setAttribute('subtitle', val);
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(val) {
    this.setAttribute('type', val);
  }


  render() {
    this.shadow.innerHTML = `
      <div id="modal-dialog-wrapper" class="centralized">
        <div id="modal-dialog-card" class="${this.type}">
          ${this.title ? `<h1>${this.title}</h1>` : ''}
          ${this.subtitle ? `<h2>${this.subtitle}</h2>`: ''}
          <div id="modal-dialog-buttons">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('modal-dialog', ModalDialog);