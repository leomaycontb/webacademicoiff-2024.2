const registroEscolarLocalStyles = new CSSStyleSheet();
registroEscolarLocalStyles.replaceSync(`
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

  #navs-wrapper {
    padding: 0 3%;
  }

  .row {
    margin-top: 5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  navigator-box {
    width: 45%;
  }
`);

class RegistroEscolar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, registroEscolarLocalStyles];
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
      <main class="container">
        <section id="page-title" class="centralized">
          <button onclick="window.history.back();"><img src="assets/circle-back-arrow.svg"/></button>
          <h1>REGISTRO ESCOLAR</h1>
        </section>
        <section id="navs-wrapper">
          <div class="row">
            <navigator-box color="#F9CF64" title="Consultas" links="Dados dos Alunos:dados-do-aluno.html;Dados dos Professores:dados-dos-professores.html;Dados dos Funcionários:dados-dos-funcionarios.html;Mapa das Salas:mapa-das-salas.html;Conferência de Aulas:conferencia-de-aulas.html;Calendário Acadêmico:calendario-academico.html;Estatísticas:estatisticas.html"></navigator-box>

            <navigator-box color="#F9CF64" title="Relatórios" links="Requerimento:requerimento.html;Boletim Escolar:boletim-escolar.html;Atas de Conselho de Classe / Turma:atas-conselho.html;Diário dos Professores:diario-professores.html;Matrizes Curriculares:matrizes-curriculares.html;Pedido de Matrícula:pedido-matricula.html;Alteração de nota:alteracao-nota.html"></navigator-box>
          </div>
          <div class="row">
            <navigator-box color="#B697E8" title="Procedimentos" links="Procedimento 1:#;Procedimento 2:#;Procedimento 3:#;Procedimento 4:#;Procedimento 5:#;Procedimento 6:#;Procedimento 7:#"></navigator-box>

            <navigator-box color="#B697E8" title="Aplicação" links="Procedimento 1:#;Procedimento 2:#;Procedimento 3:#;Procedimento 4:#;Procedimento 5:#;Procedimento 6:#;Procedimento 7:#"></navigator-box>
          </div>
        <section>
      </main>
    `;
  }
}

customElements.define("registro-escolar", RegistroEscolar);