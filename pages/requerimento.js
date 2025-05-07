const requirementLocalStyles = new CSSStyleSheet();

requirementLocalStyles.replaceSync(`
  main {
    margin-top: 3% !important;
    padding-bottom: 5%;
  }

  #page-title {
    justify-content: flex-start !important;
  }

  #page-title button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  #page-title h1 {
    font-size: 150%;
    font-weight: bold;
    color: #493159;
    margin-left: 1%;
  }

  #page-title h1 span {
    font-weight: 100;  
  }

  #form-wrapper {
    margin-top: 3%;
    padding: 0 3%;
  }

  #form-wrapper h2 {
    color: #493159;
    margin-bottom: 2%;
  }

  .row {
    margin-top: 1.5%;
    gap: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #text-area-wrapper {
    margin-top: 2%;
    width: 100%;
  }

  #text-area-wrapper h3 {
    color: #493159;
    font-size: 140%;
    margin-bottom: 10px;
  }

  #text-area-wrapper textarea {
    width: 100%;
    border-radius: 12px;
    padding: 10px 15px;
    color: #493159;
    font-size: 110%;
  }

  button-component {
    float: right;
    margin-top: 40px;
  }
`);

class RequirementPage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, requirementLocalStyles];
    this.registroApi = RegistroApi.instance;
    if(!this.registroApi.loggedUser) {
      window.location.href = "login.html";
    }
    const params = new URLSearchParams(window.location.search);
    this.requirement = this.registroApi.getRequirementsData(Number(params.get("id")));
    if(!this.requirement) {
      window.location.href = "requerimentos.html";
    }
  }

  connectedCallback() {
    this.render();

    const inputs = this.shadow.querySelectorAll('input-component');
    const buttonSubmit = this.shadow.querySelector('#submit');

    buttonSubmit.onClick = this.onSubmit.bind(this);

    inputs.forEach(input => {
      const name = input.name;
      input.onChange = this[`onchange${name}`].bind(this);
    });

    const closeDialogErrorButton = this.shadow.querySelector("#closeDialogButtonError");
    if(closeDialogErrorButton) {
      closeDialogErrorButton.onClick = this.onCloseErrorDialog.bind(this);
    }

    const closeDialogSuccessButton = this.shadow.querySelector("#closeDialogButtonSuccess");
    if(closeDialogSuccessButton) {
      closeDialogSuccessButton.onClick = this.onCloseSuccessDialog.bind(this);
    }
  }

  onCloseErrorDialog() {
    window.location.href = 'requerimentos.html';
  }

  onCloseSuccessDialog() {
    window.location.href = 'requerimentos.html';
  }

  onchangename(val) {
    this.name = val;
  }
  onchangematricula(val) {
    this.matricula = val;
  }
  onchangepasta(val) {
    this.pasta = val;
  }
  onchangephone(val) {
    this.phone = val;
  }
  onchangeemail(val) {
    this.email = val;
  }
  onchangecurso(val) {
    this.curso = val;
  }
  onchangedata(val) {
    this.data = val;
  }

  onSubmit() {
    const params = new URLSearchParams(window.location.search);

    const id = Number(params.get("id"));

    const {success, message} = this.registroApi.updateRequirement(id, {
      "Nome do Aluno": this.name || this.requirement["Nome do Aluno"],
      "Curso": this.curso || this.requirement["Curso"],
      "Matrícula": this.matricula || this.requirement["Matrícula"],
      "Telefone": this.phone || this.requirement["Telefone"],
      "Email": this.email || this.requirement["Email"],
      "Data da Solicitação": this.data || this.requirement["Data da Solicitação"],
      "Número da Pasta": this.pasta || this.requirement["Número da Pasta"],
      "Justificativa": this.Justificativa || this.requirement["Justificativa"]
    })

    if(!success) {
      this.errorMessage = message;
    } else {
      this.successMessage = message;
    }
    this.connectedCallback();
  }

  render() {
    this.shadow.innerHTML = `
        ${this.errorMessage ? `<modal-dialog id="loginErrorDialog" type="error" title="${this.errorMessage}">
          <button-component color="white" backgroundColor="#DC143C" id="closeDialogButtonError">Fechar</button-component>
        </modal-dialog>` : ''}
        ${this.successMessage ? `<modal-dialog id="loginSuccessDialog" type="confirm" title="${this.successMessage}">
          <button-component color="white" backgroundColor="#AEC171" id="closeDialogButtonSuccess">Fechar</button-component>
        </modal-dialog>` : ''}
      <main class="container">
        <section id="page-title" class="centralized">
          <button onclick="window.history.back();"><img src="assets/circle-back-arrow.svg"/></button>
          <h1>REQUERIMENTO &nbsp;<span>${this.requirement["Tipo de Requerimento"]}</span></h1>
        </section>
        <section id="form-wrapper">
          <h2>Dados do aluno</h2>
          <form>
            <div class="row">
              <input-component name="name" value="${this.requirement["Nome do Aluno"]}" style="flex: 2;" label="Nome do Aluno:" placeholder="Nome do Aluno" type="text"></input-component>

              <input-component name="matricula" value="${this.requirement["Matrícula"]}" style="flex: 1;" label="Matrícula:" placeholder="0000000000" type="text"></input-component>

              <input-component name="pasta" value="${this.requirement["Número da Pasta"]}" style="flex: 1;" label="Número de Pasta:" placeholder="00000" type="text"></input-component>
            </div>

            <div class="row">
              <input-component name="phone" value="${this.requirement["Telefone"]}" style="flex: 1;" label="Telefone:" placeholder="+00 (00) 00000-0000" type="text"></input-component>

              <input-component name="email" value="${this.requirement["Email"]}" style="flex: 1;" label="Email:" placeholder="digite.aqui@email.com" type="text"></input-component>

              <input-component name="curso" value="${this.requirement["Curso"]}" style="flex: 1;" label="Curso:" placeholder="Nome do Curso" type="text"></input-component>

              <input-component name="data" value="${this.requirement["Data da Solicitação"]}" style="flex: 1;" label="Data da Solicitação:" placeholder="00/00/0000" type="date"></input-component>
            </div>

            <div class="row">
              <div id="text-area-wrapper">
                <h3>Justificativa</h3>
                <textarea rows="7">${this.requirement["Justificativa"] ? this.requirement["Justificativa"] : '...'}</textarea>
              </div>
            </div>

            <button-component id="submit" color="white" backgroundColor="#AEC171">Gerar Atestado</button-component>
          </form>
        </section>
      </main>
    `;
  }
};

customElements.define("requerimento-page", RequirementPage);