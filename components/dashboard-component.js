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
    padding: 2% 3% 5% 3%;
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

  #chart {
    height: 450px;
    margin-top: 2%;
    position: relative;
  }

  #horizontal-lines {
    position: absolute;
    width: 100%;
    height: 450px;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
  }

  .horizontal-line-wrapper {
    display: flex;
  }

  .horizontal-line-span-wrapper {
    width: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: #615E83;
    font-weight: 100;
  }

  .horizontal-line {
    width: 95%;
    border-top: 2px dotted #E5E5EF;
    border-left: 1px solid #9291A5;
  }

  .horizontal-line-wrapper:last-child .horizontal-line {  
    border-bottom: 1px solid #9291A5;
  }

  #bars {
    position: absolute;
    width: 100%;
    height: 450px;
    top: 0;
    left: 0;
  }

  .bar {
    display: flex;
    flex-direction: column;
  }

  .bar .bar-segment:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .bar-wrapper {
    position: absolute;
    bottom: -30px;
  }

  .bar-span-wrapper span {
    color: #615E83;
    height: 30px;
    align-items: flex-end;
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
`);

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.adoptedStyleSheets = [globalStyles, dashboardComponentLocalStyles];
    this.registroApi = RegistroApi.instance;
    const {success, data} = this.registroApi.chartData;
    if(!success) {
      window.location.href = "login.html";
    }
    this.chartData = data;
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
                ${this.chartData.segmentCaptions.map(caption => `
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
            <div id="horizontal-lines">
              ${this.chartData.YaxisBreakpoints.reverse().map((YAxisBreakpoint, idx, arr) => `
                <div class="horizontal-line-wrapper" style="height: ${YAxisBreakpoint.percent}%">
                  <div class="horizontal-line-span-wrapper">
                    <span>${YAxisBreakpoint.caption}</span>
                    ${idx == arr.length - 1 ? '<span>0</span>' : ''}
                  </div>
                  <div class="horizontal-line"></div>
                </div>
              `).join('')}
            </div>

            <div id="bars">
              ${this.chartData.bars.map((bar, idx, arr) => `
                <div class="bar-wrapper" style="width: calc(40% / ${arr.length}); left: calc(8% + (40% / ${arr.length}) * ${idx} + (51% / ${arr.length - 1}) * ${idx})">
                  <div class="bar" style="height: calc(450px * ${bar.percent / 100});">
                    ${bar.segments.map(segment => `
                      <div class="bar-segment" style="background-color: ${segment.color}; height: ${segment.percent}%;"></div>
                    `).join('')}
                  </div>
                  <div class="bar-span-wrapper">
                    <span class="centralized">${bar.caption}</span>
                  </div>
                </div>
              `).join('')}  
              </div>
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