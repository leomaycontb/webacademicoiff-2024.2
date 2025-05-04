const dashboardComponentLocalStyles = new CSSStyleSheet();

dashboardComponentLocalStyles.replaceSync(`
  #dashboard {
    margin-top: 10%;
  }

  #dashboard h1 {
    font-size: 200%;
    color: #493159;
    text-align: center;
  }

  #chart-card {
    margin-top: 4%;
    padding: 2% 3%;
    border-radius: 20px;
    box-shadow: 0 5px 5px rgba(0,0,0,.1);
  }

  #chart-header {
    display: flex;
    justify-content: space-between;
    align-item: flex-end;
    padding-bottom: 1.5%;
    border-bottom: 1px solid #D9D9D9;
  }

  #chart-header h1 {
    text-align: start;
    font-size: 130%;
    font-weight: bold;
    width: 30%;
  }
  
  #chart-header h1 span {
    font-weight: 100;
    color: #B697E8;
  }

  ul {
    display: flex;
    list-style: none;
    gap: 30px;
    padding-top: 20px;
  }

  .caption-wrapper {
    gap: 60px;
    justify-content: flex-end !important;
    width: 70%;
  }

  .caption-color {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;
  }

  select {
    border:none;
    cursor: pointer;
    outline:none;
    color: #615E83;
    padding: 1.5% 5% 1.5% 2.5%;
    border-radius: 20px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #F8F8FF url('assets/select-arrow.svg') 85% 50% no-repeat;
  }

  #diary {
    width: 40%;
    margin-top: 10%;
  }

  #diary h1 {
    color: #493159;
    text-align: start;
    font-size: 120%;
    margin-bottom: 2%;
  }

  .progress-bar-wrapper {
    gap: 15px;
  }

  .progress-bar-wrapper span {
    color: #493159;
  }

  #progress-bar {
    width: 100%;
    height: 22px;
    border: 2px solid #F9CF64;
    border-radius: 20px;
  }

  #progress-bar-fill {
    margin-top: -2px;
    margin-left: -2px;
    height: 22px;
    background-color: #493159;
    border-radius: 20px;
  }

  #chart {
    height: 450px;
    margin-top: 2%;
  }

  .horizontal-line-wrapper {
    display: flex;
  }

  .horizontal-line-span-wrapper {
    width: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-top: 1%;
    color: #615E83;
    font-weight: 100;
  }

  .horizontal-line {
    height: 90px;
    width: 90%;
    border-top: 2px dotted #E5E5EF;
    border-left: 1px solid #9291A5;
  }

  .horizontal-line-wrapper:last-child .horizontal-line {  
    border-bottom: 1px solid #9291A5;
  }
`);

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.adoptedStyleSheets = [globalStyles, dashboardComponentLocalStyles];
    this.registroApi = RegistroApi.instance;
    this.captions = [
      {
        title: "Ativos",
        color: "#493159"
      },
      {
        title: "Engressando",
        color: "#8B62CD"
      },
      {
        title: "Formando",
        color: "#E0C6FD"
      },
      {
        title: "Trancados",
        color: "#F0E5FC"
      },
    ]
  }

  connectedCallback() {
    this.render();
  }

  get diaryPercent() {
    const {success, data} = this.registroApi.teachers;
    if(!success) {
      window.location.href = "login.html"
    }
    
    return (data.filter(teacher => teacher.hasSentDiary).length / data.length) * 100;
  }

  render() {
    this.shadow.innerHTML = `
      <section id="dashboard">
        <h1>DASHBOARD</h1>
        <section id="chart-card">
          <header id="chart-header">
            <h1>
              <span>Estatísticas</span></br>
              Matrículas de Alunos
            </h1>

            <div class="centralized caption-wrapper">
              <ul>
                ${this.captions.map(caption => `
                  <li>
                    <div class="caption-color" style="background-color: ${caption.color}"></div>
                    ${caption.title}
                  </li>  
                `).join('')}
              </ul>

              <select>
                <option name="period">Por período</option>
              </select>
            </div>
          </header>

          <section id="chart">
            <div class="horizontal-line-wrapper">
              <div class="horizontal-line-span-wrapper">
                <span>1M</span>
              </div>
              <div class="horizontal-line"></div>
            </div>
            <div class="horizontal-line-wrapper">
              <div class="horizontal-line-span-wrapper">
                <span>500k</span>
              </div>
              <div class="horizontal-line"></div>
            </div>
            <div class="horizontal-line-wrapper">
              <div class="horizontal-line-span-wrapper">
                <span>200k</span>
              </div>
              <div class="horizontal-line"></div>
            </div>
            <div class="horizontal-line-wrapper">
              <div class="horizontal-line-span-wrapper">
                <span>100k</span>
              </div>
              <div class="horizontal-line"></div>
            </div>
            <div class="horizontal-line-wrapper">
              <div class="horizontal-line-span-wrapper">
                <span>50k</span>
                <span>0</span>
              </div>
              <div class="horizontal-line"></div>
            </div>
          </section>
        </section>


        <section id="diary">
          <h1>PROFESSORES QUE ENTREGARAM DIÁRIO</h1>
          <div class="centralized progress-bar-wrapper">
            <span>${this.diaryPercent}%</span>
            <div id="progress-bar">
              <div id="progress-bar-fill" style="width: ${this.diaryPercent}%"></div>
            </div>
            <span>${100 - this.diaryPercent}%</span>
          </div>
        </section>
      </section>
    `
  }
}

customElements.define("dashboard-component", DashboardComponent);