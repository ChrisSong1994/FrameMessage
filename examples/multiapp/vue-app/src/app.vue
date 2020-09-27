<template>
  <div>
    <h1>vue-app</h1>
    <button v-on:click="getUserInfo()">修改主题</button>
  </div>
</template>
<script>
import { Client } from "../../../../es";
export default {
  name: "app",
  moment() {},
  methods: {
    getUserInfo: function() {
      const client = new Client(window.parent);
      client
        .request("CHANGE_BG_COLOR", { color: "#FFE4B5" })
        .then(res => {
          debugger;
          console.log(res);
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
