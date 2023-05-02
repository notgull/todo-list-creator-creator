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
            this.backgroundColor = '#181818'
            this.textColor = 'rgba(235, 235, 235, 0.64)'
            this.emphasizedColor = 'hsla(160, 100%, 37%, 1)'
        }
    }

    apply() {
        document.body.style.backgroundColor = this.backgroundColor;
        document.body.style.color = this.textColor;
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

    backgroundColor() {
        return this.backgroundColor;
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }
    
    textColor() {
        return this.textColor;
    }

    setTextColor(color) {
        this.textColor = color;
    }

    emphasizedColor() {
        return this.emphasizedColor;
    }

    setEmphasizedColor(color) {
        this.emphasizedColor = color;
    }

    static getInstance() {
        return this.instance;
    }
}