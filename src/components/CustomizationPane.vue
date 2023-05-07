<script>
import { defineComponent } from 'vue';
import Css from '../Css';

const css = Css.getInstance();
console.log(css);

export default defineComponent({
  data: () => ({
    backcolor: css.backgroundColor,
    textcolor: css.textColor,
    empcolor: css.emphasizedColor,
    fontfamily: css.fontFamily,
    fontsize: css.fontSize,
    highlightondue: css.highlightOnDeadline
  }),
  methods: {
    apply() {
      css.setBackgroundColor(this.backcolor);
      css.setTextColor(this.textcolor);
      css.setEmphasizedColor(this.empcolor);
      css.setFontFamily(this.fontfamily);
      css.setFontSize(this.fontsize);
      css.setHighlightOnDeadline(this.highlightondue);
      css.applyAndSave();
    },
    setBackcolor(ev) {
      this.backcolor = ev.target.value;
    },
    setTextcolor(ev) {
      this.textcolor = ev.target.value;
    },
    setEmpcolor(ev) {
      this.empcolor = ev.target.value;
    },
    setFontfamily(ev) {
      this.fontfamily = ev.target.value;
    },
    setFontsize(ev) {
      this.fontsize = ev.target.value;
    },
    setHighlightondue(ev) {
      this.highlightondue = ev.target.checked;
    }
  }
});
</script>

<template>
  <ul>
    <li>
      <label for="backcolor">Background Color:</label>
      <input
        type="color"
        id="backcolor"
        name="backcolor"
        :value="backcolor"
        @change="setBackcolor"
      />
    </li>
    <li>
      <label for="textcolor">Text Color:</label>
      <input
        type="color"
        id="textcolor"
        name="textcolor"
        :value="textcolor"
        @change="setTextcolor"
      />
    </li>
    <li>
      <label for="empcolor">Emphasized Color:</label>
      <input type="color" id="empcolor" name="empcolor" :value="empcolor" @change="setEmpcolor" />
    </li>
    <li>
      <label for="fontfamily">Font Family:</label>
      <input
        type="text"
        id="fontfamily"
        name="fontfamily"
        :value="fontfamily"
        @change="setFontfamily"
      />
    </li>
    <li>
      <label for="fontsize">Font Size:</label>
      <input type="text" id="fontsize" name="fontsize" :value="fontsize" @change="setFontsize" />
    </li>
    <li>
      <label for="highlightondue">Highlight on Due:</label>
      <input
        type="checkbox"
        id="highlightondue"
        name="highlightondue"
        :value="highlightondue"
        @change="setHighlightondue"
      />
    </li>
  </ul>
</template>
