const tableComponentLocalStyles = new CSSStyleSheet();

tableComponentLocalStyles.replaceSync(`
  main {
    padding: 5% 0%;
  }

  #page-header {
    justify-content: space-between !important;
  }

  #page-title {
    gap: 10px;
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
  }

  #selects {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  select:first-child {
    margin-right: 1%;
  }

  select {
    border: 1px solid #D9D9D9;
    cursor: pointer;
    outline:none;
    color: #615E83;
    padding: 1.2% 5% 1.2% 2%;
    border-radius: 10px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: white url('assets/select-arrow.svg') 90% 50% no-repeat;
  }

  #table-wrapper {
    margin-top: 2.5%;
  }

  #filter {
    justify-content: flex-start !important;
    gap: 10px;
  }

  #filter button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    color: #493159;
    font-size: 100%;
    text-decoration: underline;
    font-weight: bold;
  }

  #filter span {
    color: #493159;
    font-size: 120%;
    font-weight: 100;
  }

  table {
    margin-top: 2%;
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background-color: #493159;
  }

  th {
    text-align: left;
    color: white;
  }

  th:first-child {
    border-top-left-radius: 10px;
  }

  th:last-child {
    border-top-right-radius: 10px;
  }

  th, td {
    padding: 1% 2%;
  }

  td {
    color: #493159;
    border: 2px solid #493159;
  }

  tr {
    cursor: pointer;
  }

  tr:hover td {
    background-color: #F8F8FF;
  }
`);

class TableComponent extends HTMLElement {
  #_data;
  #rowsFiltered;
  #firstSelectValue;
  #secondSelectValue;
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, tableComponentLocalStyles];
    this.registroApi = RegistroApi.instance;
  }

  connectedCallback() {
    this.render();

    const selects = this.shadow.querySelectorAll("select");
    selects.forEach(select => {
      select.onchange = (e) => {
        const [fnLabel, idx] = e.target.value.split(":");
        let field, fun;
        if(fnLabel == "first") {
          let {value, fn} = this.data.firstSelectValuesAndFiltersFn[Number(idx)];
          field = value;
          fun = fn;
          this.#firstSelectValue = e.target.value;
        }
        if(fnLabel == "second") {
          let {value, fn} = this.data.secondSelectValuesAndFiltersFn[Number(idx)];
          field = value;
          fun = fn;
          this.#secondSelectValue = e.target.value;
        }
        this.#rowsFiltered = this.data.rows.filter((row) => fun(row, field));
        this.connectedCallback();
      }
    })
  }

  get dataFnKey() {
    return this.getAttribute('dataFnKey');
  }

  set dataFnKey(val) {
    this.setAttribute('dataFnKey', val);
  }

  get data() {
    if(this.#_data) return this.#_data;

    const {success, data} = this.registroApi[this.dataFnKey];

    if(!success) {
      window.location.href = "login.html";
    }

    this.#_data = data;
    this.#rowsFiltered = data.rows;

    return data;
  }

  get tableKeys() {
    if(this.data.rows.length) {
      return Object.keys(this.data.rows[0]).filter(key => key != 'selfUrl');
    }

    return [];
  }

  render() {
    this.shadow.innerHTML = `
      <main class="container">
        <section id="page-header" class="centralized">
          <div id="page-title" class="centralized">
            <button onclick="window.history.back();"><img src="assets/circle-back-arrow.svg"/></button>
            <h1>REQUERIMENTOS</h1>
          </div>

          <div id="selects">
            <select>
              ${this.data.firstSelectValuesAndFiltersFn.map((item, idx) => `
                <option value="first:${idx}"${`first:${idx}` == this.#firstSelectValue ? ' selected' : ''}>${item.value}</option>
              `).join('')}
            </select>
            <select>
              ${this.data.secondSelectValuesAndFiltersFn.map((item, idx) => `
                <option value="second:${idx}""${`second:${idx}` == this.#secondSelectValue ? ' selected' : ''}>${item.value}</option>
              `).join('')}
            </select>
          </div>
        </section>

        <section id="table-wrapper">
          <div id="filter" class="centralized">
            <button>Filtrar por:</button><span>Mais Recentes</span>
          </div>

          <table>
            <thead>
                <tr>
                  ${this.tableKeys.map(key => `
                    <th>${key}</th>
                  `).join('')}
                </tr>
            </thead>
            <tbody>
                ${this.#rowsFiltered.map(row => `
                  <tr onclick="window.location.href = '${row.selfUrl}';">${this.tableKeys.map(key => `
                    <td>${row[key]}</td>
                  `).join('')}</tr>
                `).join('')}
            </tbody>
          </table>
        </section>
      </main>
    `;
  }
}

customElements.define("table-component", TableComponent);