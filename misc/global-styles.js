const globalStyles = new CSSStyleSheet();

globalStyles.replaceSync(`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  .container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }
`);