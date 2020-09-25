<template>
  <button v-on:click="handleChangeTheme()">修改主题</button>
</template>

<script>
import { Client } from "framemessage";

export default {
  name: "App",
  data: function() {
    return {
      client: null
    };
  },
  mounted: function() {
    this.client = new Client(window.parent);
  },
  methods: {
    handleChangeTheme: function() {
      this.client
        .request("CHANGE_BG_COLOR", { color: "red" })
        .then(res => {
          // debugger;
          console.log(res);
        })
        .catch(data => {
          // debugger;
          console.log(data);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
