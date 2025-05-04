const customCalendarLocalStyles = new CSSStyleSheet();

customCalendarLocalStyles.replaceSync(`
  #month-year {
    display: flex;
    margin-bottom: 4%;
  }

  #month-year span {
    flex: 1;
    padding: 8px;
    font-weight: bold;
    text-align: center;
  }

  #month-year span:first-child {
    background: #fcd34d;
    color: #fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  #month-year span:last-child {
    background: #d8b4fe;
    color: white;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  #calendar-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 3%;
    color: #493159;
  }

  #calendar-header h1 {
    font-size: 200%;
  }

  #calendar-header h2 {
    font-size: 190%;
    font-weight: 100;
  }

  #weekdays-mark {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 90%;
    font-weight: bold;
    margin-bottom: .5%;
  }

  #calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .empty-slot {
    background-color: #F5F5F5;
    border-radius: 8px;
  }

  .day {
    border: 1px solid #D9D9D9;
    color: #493159;
    position: relative;
    height: 55px;
    border-radius: 8px;
  }

  .day span {
    position: absolute;
    top: 10%;
    left: 10%;
    font-weight: bold;
  }

  .highlight {
    background-color: #d9f99d;
  }

  .weekend span {
    color: #49315980;
  }

  .today {
    background-color: #5b21b6;
  }

  .today span {
    color: white;
  }

  #calendar-buttons {
    position: absolute;
    bottom: 0%;
    right: 2%;
  }

  #calendar-buttons button {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
  }

  #calendar-buttons button img {
    height: 25px;
  }

  #events {
    background: #f9fafb;
    padding: 5% 5% 8%;
    margin-top: 5%;
    border-radius: 12px;
  }

  #events h3 {
    margin: 0;
    font-size: 1rem;
  }

  .event {
    font-size: 0.9rem;
    margin-top: 8px;
  }

  .event span {
    display: block;
    font-weight: bold;
  }

  .event.past {
    color: #a1a1aa;
  }

  .event.active {
    color: #e879f9;
  }

  .event.upcoming {
    color: #000;
  }
`);

class CustomCalendar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.adoptedStyleSheets = [globalStyles, customCalendarLocalStyles]
    this.currentDate = new Date();
    this.registroApi = RegistroApi.instance;
  }

  connectedCallback() {
    this.render();

    const previousButton = this.shadow.querySelector("#previous");
    const nextButton = this.shadow.querySelector("#next");
    previousButton.onclick = this.onClickPrevious.bind(this);
    nextButton.onclick = this.onClickNext.bind(this);
  }

  onClickNext() {
    this.currentDate.setMonth(this.currentDate.getMonth()+1);
    this.connectedCallback();
  }

  onClickPrevious() {
    this.currentDate.setMonth(this.currentDate.getMonth()-1);
    this.connectedCallback();
  }

  get events() {
    const {success, data} = this.registroApi.events;
    if(!success) {
      window.location.href = "login.html"
    }
    return data.filter(event => {
      const currentMonth = this.currentDate.getMonth();
      const initMonth = event.dateRange.init.getMonth();
      const endMonth = event.dateRange.end.getMonth();
      return currentMonth == initMonth || currentMonth == endMonth || (initMonth <= currentMonth && endMonth >= currentMonth);
    });
  }

  render() {
    const month = this.currentDate.toLocaleString("pt-BR", { month: "long" });
    const year = this.currentDate.getFullYear();

    this.shadow.innerHTML = `
      <div id="month-year">
        <span>MÊS</span>
        <span>ANO</span>
      </div>

      <div id="calendar-header">
        <h1>${month.charAt(0).toUpperCase() + month.slice(1)}</h1><h2>${year}</h2>
      </div>

      <div id="weekdays-mark">
        <div><span>D</span></div>
        <div><span>S</span></div>
        <div><span>T</span></div>
        <div><span>Q</span></div>
        <div><span>Q</span></div>
        <div><span>S</span></div>
        <div><span>S</span></div>
      </div>

      <div id="calendar-grid">
        ${this.buildCalendarGrid()}
      </div>

      <div id="events">
        <h3>EVENTOS</h3>
        ${this.buildEvents()}
      </div>
    `;
  }

  buildEvents() {
    if(!this.events.length) return '';

    let today = new Date();
    const eventsHtml = this.events.map(event => {
      let classes = ['event'];
      if(this.checkDateInEvent(today, event)) {
        classes.push("active");
      }
      if(this.checkIsEventUpcoming(today, event)) {
        classes.push("upcoming");
      }
      if(this.checkIsEventPast(today, event)) {
        classes.push("past");
      }
      return `
        <div class="${classes.join(' ')}">
          <span>Dia ${event.dateRange.init.getDate()}~${event.dateRange.end.getDate()}</span>
          ${event.title}
        </div>
      `;
    });

    return eventsHtml.join(" ");
  }

  checkIsEventPast(date, event) {
    const end = event.dateRange.end;

    if(end.getFullYear() < date.getFullYear()) return true;

    if(end.getMonth() < date.getMonth() && end.getFullYear() == date.getFullYear()) return true;

    if(end.getDate() < date.getDate() && end.getFullYear() == date.getFullYear() && end.getMonth() == date.getMonth()) return true;
  }

  checkIsEventUpcoming(date, event) {
    const init = event.dateRange.init;

    if(init.getFullYear() > date.getFullYear()) return true;

    if(init.getMonth() > date.getMonth() && init.getFullYear() == date.getFullYear()) return true;

    if(init.getDate() > date.getDate() && init.getFullYear() == date.getFullYear() && init.getMonth() == date.getMonth()) return true;
  }

  checkDateInEvent(date, event) {
    const init = event.dateRange.init;
    const end = event.dateRange.end;
    
    const checkInit = date.getDate() == init.getDate() && date.getMonth() == init.getMonth() && date.getFullYear() == init.getFullYear();
    const checkEnd = date.getDate() == end.getDate() && date.getMonth() == end.getMonth() && date.getFullYear() == end.getFullYear();
    const checkBetween = date.getDate() >= init.getDate() && date.getMonth() >= init.getMonth() && date.getFullYear() >= init.getFullYear() &&
      date.getDate() <= end.getDate() && date.getMonth() <= end.getMonth() && date.getFullYear() <= end.getFullYear();
    
    return checkInit || checkEnd || checkBetween;
  }

  getLastSaturdayOfMonth(year, month) {
    const lastDay = new Date(year, month + 1, 0);
    const dayOfWeek = lastDay.getDay();
    const diff = (dayOfWeek - 6 + 7) % 7;
    const lastSaturday = new Date(lastDay);
    lastSaturday.setDate(lastDay.getDate() - diff);
    return lastSaturday;
  }

  buildCalendarGrid() {
    const days = [];
    const date = new Date(this.currentDate);
    date.setDate(1);
    const firstDay = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const lastSaturday = this.getLastSaturdayOfMonth(this.currentDate.getFullYear(), this.currentDate.getMonth()).getDate();
    const events = this.events;

    for (let i = 0; i < firstDay; i++) {
      days.push(`<div class="empty-slot"></div>`);
    }

    const today = new Date();

    for (let i = 1; i <= lastDay; i++) {
      let classes = ['day'];
      if (
        i == today.getDate() &&
        this.currentDate.getMonth() == today.getMonth() &&
        this.currentDate.getFullYear() == today.getFullYear()
      ) {
        classes.push("today");
      }
      let now = new Date(`${this.currentDate.getFullYear()}-${this.currentDate.getMonth()+1}-${i}`);
      if([0, 6].includes(now.getDay())) {
        classes.push("weekend");
      }

      const isEvent = events.some(event => this.checkDateInEvent(now, event))

      if (isEvent) classes.push("highlight");

      days.push(`<div class="${classes.join(" ")}"><span>${i}</span>
        ${lastSaturday == i ? `<div id="calendar-buttons" class="centralized">
          <button id="previous">
            <img src="assets/calendar-arrow-left.svg" alt="Anterior"/>
          </button>
          <button id="next">
            <img src="assets/calendar-arrow-right.svg" alt="Próximo"/>
          </button>
        </div>` : ''}
      </div>`);
    }

    return days.join("");
  }
}

customElements.define("custom-calendar", CustomCalendar);
