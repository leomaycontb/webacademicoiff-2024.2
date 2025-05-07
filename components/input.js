const inputLocalStyles = new CSSStyleSheet();

inputLocalStyles.replaceSync(`
  div {
    display: flex;
    flex-direction: column;
  }

  label {
    color: #493159;
    font-size: 130%;
    margin-bottom: 10px;
  }

  input {
    font-size: 100%;
    outline: none;
    padding: 12px 17px;
    color: #8E8E93;
    border: 1px solid #D9D9D9;
    border-radius: 12px;
  }
`);

class InputComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, inputLocalStyles];

    this.onChange = null;
  }

  connectedCallback() {
    this.render();
    
    const input = this.shadow.querySelector("input");

    const onChange = e => {
      if(this.onChange) {
        this.onChange(e.target.value);
      }
    }
    input.onkeyup = onChange;
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(val) {
      this.setAttribute('placeholder', val);
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(val) {
    this.setAttribute('label', val);
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    this.setAttribute('name', val);
  }

  render() {
    this.shadow.innerHTML = `
      <div>
        <label for="input">${this.label}</label>
        <input ${!!this.value ? `value="${this.value}"` : ''}id="input" type="${this.type}" placeholder="${this.placeholder}"/>
      </div>
    `;
  }
}

customElements.define('input-component', InputComponent);