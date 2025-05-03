const buttonComponentLocalStyles = new CSSStyleSheet();

buttonComponentLocalStyles.replaceSync(`
  button {
    outline: none;
    background: none;
    padding: 2% 5%;
    border: none;
    border-radius: 10px;
    font-size: 100%;
    cursor: pointer;
  }
`);

class ButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, buttonComponentLocalStyles];
  }

  connectedCallback() {
    this.render();

    const button = this.shadow.querySelector("button");

    button.onclick = () => {
      if(this.onClick) this.onClick();
    }
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(val) {
    this.setAttribute('color', val);
  }

  get outline() {
    return this.getAttribute('outline');
  }

  set outline(val) {
    this.setAttribute('outline', val);
  }

  get outlineColor() {
    return this.getAttribute('outlineColor');
  }

  set outlineColor(val) {
    this.setAttribute('outlineColor', val);
  }

  get backgroundColor() {
    return this.getAttribute('backgroundColor');
  }

  set backgroundColor(val) {
    this.setAttribute('backgroundColor', val);
  }

  get customStyles() {
    return `
      ${this.color ? `
        color: ${this.color};
      ` : ''}

      ${this.outline == 'true' ? `
        border: 1px solid ${this.outlineColor}
      ` : ''}

      ${this.backgroundColor ? `
        background: ${this.backgroundColor};
      ` : ''}
    `;
  }

  render() {
    this.shadow.innerHTML = `
      <button style="${this.customStyles}"><slot></slot></button>
    `
  }
}

customElements.define('button-component', ButtonComponent);