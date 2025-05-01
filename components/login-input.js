const loginInputlocalStyles = new CSSStyleSheet();

loginInputlocalStyles.replaceSync(`
  input {
    border: none;
    padding: 15px;
    width: 100%;
    display: block;
    outline: none;
    border-radius: 10px;
  }

  input::placeholder {
    font-size: 15px;
    color: black;
  }

  #input-wrapper {
    position: relative;
    width: 100%;
  }

  #clear-btn {
    position: absolute;
    outline: none;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
`)

class LoginInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, loginInputlocalStyles];

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

    const button = this.shadow.querySelector("button");
    button.onclick = () => {
      input.value = '';
      onChange({target: {value: ''}});
    }
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

  attributeChangedCallback(name, _, newVal) {
    this[name] = newVal;
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <div id="input-wrapper">
        <input type="${this.type}" placeholder="${this.placeholder}"/>
        <button id="clear-btn"><img src="/assets/clear-icon.svg"/></button>
      </div>
    `;
  }
}

customElements.define('login-input', LoginInput)