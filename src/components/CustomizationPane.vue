<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    backcolor: '#ffffff'
  })
});
</script>

<template>
  <label for="backcolor">Background Color:</label>
  <input type="color" id="backcolor" name="backcolor" v-model="backcolor" />
</template>
