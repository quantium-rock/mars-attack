<template>
  <div>
    <iframe
      :src="websiteUrl"
      frameborder="0"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
const websiteUrl = "https://www.santander.com";
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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
