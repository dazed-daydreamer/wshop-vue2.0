<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("//at.alicdn.com/t/font_1674650_ncmehllsd.css");
@import "./styles/public.scss";
body {
  margin: 0;
  background-color: #fafafa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

ul {
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
