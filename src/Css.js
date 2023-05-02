// CSS Manipulation

export default class Css {
  static instance = new Css();

  Css() {
    const obj = localStorage.getItem('tlcc_css');
    if (obj) {
      const css = JSON.parse(obj);
      this.backgroundColor = css.backgroundColor;
      this.textColor = css.textColor;
      this.emphasizedColor = css.emphasizedColor;
    } else {
      this.backgroundColor = '#181818';
      this.textColor = 'rgba(235, 235, 235, 0.64)';
      this.emphasizedColor = 'hsla(160, 100%, 37%, 1)';
    }
  }

  apply() {
    const body = document.querySelector('body');
    body.style.backgroundColor = this.backgroundColor;
    body.style.color = this.textColor;
  }

  save() {
    const obj = {
      backgroundColor: this.backgroundColor,
      textColor: this.textColor,
      emphasizedColor: this.emphasizedColor
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

  static getInstance() {
    return this.instance;
  }
  
}
