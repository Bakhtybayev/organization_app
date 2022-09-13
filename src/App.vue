<template>
  <div>
    <Header />
    <AddOrganization />
    <Organizations />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import AddOrganization from "./components/AddOrganization.vue";
import Organizations from "./components/Organizations.vue";

export default {
  name: "App",
  components: {
    Header,
    AddOrganization,
    Organizations,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
