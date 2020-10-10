<template>
  <div>
    <h1>vue-app</h1>
    <button v-on:click="getUserInfo()">获取主题</button>
    <div>{{ JSON.stringify(themeInfo) }}</div>
  </div>
</template>
<script>
import { Client } from "../../../../dist";
export default {
  name: "app",
  data() {
    return {
      themeInfo: {}
    };
  },
  moment() {},
  methods: {
    getUserInfo: function() {
      const client = new Client(window.parent);
      client
        .request("GET_THEME_INFO")
        .then(res => {
          debugger;
          console.log(res);
          this.themeInfo = res.data;
        })
        .catch(data => {
          debugger;
          console.log(data);
        });
    }
  }
};
</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
