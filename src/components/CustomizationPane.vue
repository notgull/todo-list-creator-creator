<script>
import { defineComponent } from 'vue';
import Css from "../Css"

const css = new Css()

export default defineComponent({
  data: () => ({
    backcolor: css.backgroundColor(),
    textcolor: css.textColor(),
    empcolor: css.emphasizedColor(),
  }),
  methods: {
    apply() {
      css.setBackgroundColor(this.backcolor)
      css.setTextColor(this.textcolor)
      css.setEmphasizedColor(this.empcolor)
      css.applyAndSave()
    }
  },
  watch: {
    backcolor() {
      this.apply()
    },
    textcolor() {
      this.apply()
    },
    empcolor() {
      this.apply()
    }
  },
});
</script>

<template>
  <label for="backcolor">Background Color:</label>
  <input type="color" id="backcolor" name="backcolor" v-model="backcolor" />
  
  <label for="textcolor">Text Color:</label>
  <input type="color" id="textcolor" name="textcolor" v-model="textcolor" />

  <label for="empcolor">Emphasized Color:</label>
  <input type="color" id="empcolor" name="empcolor" v-model="empcolor" />
</template>
