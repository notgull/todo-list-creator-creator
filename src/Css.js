// CSS Manipulation

export default class Css {
  static getInstance() {
    if (!Css.instance) {
      Css.instance = new Css();
      const obj = localStorage.getItem('tlcc_css');
      if (obj) {
        const css = JSON.parse(obj);
        Css.instance.backgroundColor = css.backgroundColor;
        Css.instance.textColor = css.textColor;
        Css.instance.emphasizedColor = css.emphasizedColor;
        Css.instance.fontFamily = css.fontFamily;
        Css.instance.fontSize = css.fontSize;
        Css.instance.highlightOnDeadline = css.highlightOnDeadline;
      } else {
        Css.instance.backgroundColor = '#181818';
        Css.instance.textColor = 'rgba(235, 235, 235, 0.64)';
        Css.instance.emphasizedColor = 'hsla(160, 100%, 37%, 1)';
        Css.instance.fontFamily = 'Arial, Helvetica, sans-serif';
        Css.instance.fontSize = '16px';
        Css.instance.highlightOnDeadline = true;
      }
    }
    return Css.instance;
  }

  apply() {
    const body = document.querySelector('body');
    body.style.backgroundColor = this.backgroundColor;
    body.style.color = this.textColor;
    body.style.fontFamily = this.fontFamily;
    body.style.fontSize = this.fontSize;
  }

  save() {
    const obj = {
      backgroundColor: this.backgroundColor,
      textColor: this.textColor,
      emphasizedColor: this.emphasizedColor,
      fontFamily: this.fontFamily,
      fontSize: this.fontSize,
      highlightOnDeadline: this.highlightOnDeadline
    };
    localStorage.setItem('tlcc_css', JSON.stringify(obj));
  }

  applyAndSave() {
    this.apply();
    this.save();
  }

  setBackgroundColor(color) {
    this.backgroundColor = color;
  }

  setTextColor(color) {
    this.textColor = color;
  }

  setEmphasizedColor(color) {
    this.emphasizedColor = color;
  }

  setFontFamily(fontFamily) {
    this.fontFamily = fontFamily;
  }

  setFontSize(fontSize) {
    this.fontSize = fontSize;
  }

  setHighlightOnDeadline(highlightOnDeadline) {
    this.highlightOnDeadline = highlightOnDeadline;
  }
  
}
