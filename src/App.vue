<template>
  <v-app>
    <v-navigation-drawer v-model="showDrawer">
      <app-navigaion-drawer @close="showDrawer = false" />
    </v-navigation-drawer>
    <v-main @click.stop="showDrawer = false">
      <app-navigaion-bar @open="showDrawer = true" />
      <router-view />
    </v-main>
  </v-app>
</template>  

<script>
export default {
  name: "App",
  data: () => ({
    showDrawer: false,
  }),
  created() {
    this.$store.dispatch("autoLogin");
  },
};
</script>

<style >
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.error-red {
  color: red;
}
.btn {
  background-color: "orange darken-2";
}
.searchBox {
  width: 30%;
  margin: 0 10px 0 10px;
  padding: 2px 5px;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}
.home:hover {
  cursor: pointer;
}
.user {
  padding-left: 5px;
  padding-right: 8px;
}
.home {
  margin-left: 0.2vw;
  padding-left: 0;
  padding-right: 0;
  margin-right: 1vw;
}
.ccontainer {
  margin-left: 2vw;
  margin-right: 2vw;
}
</style>