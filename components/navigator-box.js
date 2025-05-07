const navigatorBoxLocalStyles = new CSSStyleSheet();

navigatorBoxLocalStyles.replaceSync(`
  h1 {
    color: white;
    padding: 3% 4%;
    border-radius: 12px;
  }

  ul {
    list-style: none;
  }

  a {
    background-color: #F5F5F5;
    color: black;
    padding: 3% 4%;
    text-decoration: none;
    display: inline-block;
    width: 100%;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }

  a:hover {
    font-weight: bold;
  }

  li:not(:first-child) a {
    position: relative;
    padding: 4% 4% 3% 4%;
  }

  li:not(:first-child) a::after {
    content: "";
    display: block;
    height: 10px;
    width: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`);


class NavigatorBox extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.adoptedStyleSheets = [globalStyles, navigatorBoxLocalStyles];
  }

  get links() {
    return this.getAttribute('links').split(";").map(link => {
      const [key, value] = link.split(":");
      return {
        key,
        value
      }
    });
  }

  set links(val) {
    this.setAttribute('links', val);
  }

  get title() {
    return this.getAttribute('title');
  }

  set title(val) {
    this.setAttribute('title', val);
  }

  get color() {
    return this.getAttribute('color');
  }

  set color(val) {
    this.setAttribute('color', val);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <nav>
        <h1 style="background-color: ${this.color};">${this.title}</h1>
        <ul>
          ${this.links.map(link => `
            <li><a href="${link.value}">${link.key}</a></li>
          `).join('')}
        </ul>
      </nav>
    `
  }
}

customElements.define("navigator-box", NavigatorBox);