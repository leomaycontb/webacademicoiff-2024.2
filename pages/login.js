const loginLocalStyles = new CSSStyleSheet();
loginLocalStyles.replaceSync(`
  main {
    height: 100vh;
    gap: 100px;
    justify-content: space-between !important;
  }

  img {
    width: 50%;
  }

  section {
    width: 50%;
    background-color: #493159;
    flex-direction: column;
    border-radius: 50px;
    padding: 12% 2%;
  }

  form {
    width: 100%;
    flex-direction: column;
  }

  h1 {
    color: white; 
    font-size: 200%;
    margin-bottom: 10%;
  }

  a {
    color: white; 
    font-size: 95%;
  }

  #inputs-wrapper {
    width: 80%;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 10%;
  }

  login-input {
    width: 100%;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 3% 12%;
    background-color: #65558F;
    color: white;
    font-size: 105%;
    border-radius: 25px;
    margin-bottom: 2%;
  }
`);

class Login extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, loginLocalStyles];
    this.registroApi = RegistroApi.instance;
    if(this.registroApi.loggedUser) {
      window.location.href = "homepage.html";
    }
  }

  connectedCallback() {
    this.render();

    const nameInput = this.shadow.querySelector("#nameInput");
    nameInput.onChange = this.onChangeName.bind(this);

    const passwordInput = this.shadow.querySelector("#passwordInput");
    passwordInput.onChange = this.onChangePassword.bind(this);

    const form = this.shadow.querySelector("form");
    form.addEventListener("submit", this.onSubmitForm.bind(this));

    const closeDialogButton = this.shadow.querySelector("#closeDialogButton");
    if(closeDialogButton) {
      closeDialogButton.onClick = this.onCloseErrorDialog.bind(this);
    }
  }

  onCloseErrorDialog(_response) {
    this.errorMessage = null;
    this.connectedCallback();
  }

  onChangeName(value) {
    this.nameInput = value;
  }

  onChangePassword(value) {
    this.password = value;
  }

  onSubmitForm(event) {
    event.preventDefault();
    const response = this.registroApi.login(this.nameInput, this.password);
    if(response.success) {
      window.location.href = "homepage.html";
      return;
    }
    this.errorMessage = response.message;
    this.connectedCallback();
  }

  render() {
    this.shadow.innerHTML = `
      ${this.errorMessage ? `<modal-dialog id="loginErrorDialog" type="error" title="Erro ao realizar login" subtitle="${this.errorMessage}">
          <button-component color="white" backgroundColor="#DC143C" id="closeDialogButton">Fechar</button-component>
        </modal-dialog>` : ''}
      <main class="container centralized">
        <img src="assets/logo.png" alt="Logo da instituição"/>
        <section class="centralized">
          <h1>Faça seu login</h1>
          <form class="centralized">
            <div id="inputs-wrapper" class="centralized">
              <login-input id="nameInput" type="text" placeholder="Seu Nome Completo"></login-input>
              <login-input id="passwordInput" type="password" placeholder="Sua Senha"></login-input>
            </div>
            <button type="submit">
              Entrar
            </button>
          </form>
          <div>
            <a href="#">Esqueceu a sua senha?</a>
          </div>
        </section>
      </main>
    `;
  }
}

customElements.define('login-page', Login);