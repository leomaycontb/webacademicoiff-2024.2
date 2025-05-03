const globalStyles = new CSSStyleSheet();

globalStyles.replaceSync(`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial;
  }

  .container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .centralized {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`);