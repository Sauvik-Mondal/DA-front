<template>
  <div>
    <v-app-bar color="orange darken-2" density="compact">
      <v-app-bar-nav-icon
        class="d-md-none"
        color="orange darken-2"
        @click.stop="$emit('open')"
      >
      </v-app-bar-nav-icon>
      <v-app-bar-title class="home" @click="$router.push('/coachList')">
        <v-avatar size="34" rounded
          ><img src="../../logo.jpg" alt="logo"
        /></v-avatar>
        Digital Aristotle
      </v-app-bar-title>
      <div
        class="d-none d-md-flex"
        style="display: flex; margin: 0; padding: 0"
      >
        <v-divider inset vertical></v-divider>
        <v-btn
          class="ma-2 pa-2 btn"
          color="orange darken-2"
          dark
          @click="$router.push('/feedbackList')"
          v-if="$store.getters.isLoggedIn"
        >
          Feedbacks
        </v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn
          class="ma-2 pa-2 btn"
          color="orange darken-2"
          dark
          @click="$router.push('/coachList')"
        >
          Coach List
        </v-btn>
        <v-divider inset vertical></v-divider>
        <!-- <input
          type="text"
          class="searchBox"
          placeholder="Search here...."
          v-model="newFilterVaue"
          @keyup="updateFilter"
        /> -->
      </div>
      <v-spacer></v-spacer>
      <div
        class="d-none d-md-flex"
        style="display: flex; margin: 0; padding: 0"
      >
        <v-divider inset vertical></v-divider>
        <div class="user ma-2 pa-2 btn" v-show="$store.getters.isLoggedIn">
          User:&nbsp;{{ $store.state.user.email }}
        </div>
        <v-divider inset vertical></v-divider>
        <v-btn
          class="ma-2 pa-2 btn"
          color="orange darken-2"
          dark
          v-if="!$store.getters.isLoggedIn"
          @click="$router.push('/auth')"
        >
          Login
        </v-btn>
        <v-btn
          class="ma-2 pa-2 btn"
          color="orange darken-2"
          dark
          @click="$store.commit('logOut')"
          v-if="$store.getters.isLoggedIn"
        >
          Logout
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  emits: ['open'],
  data() {
    return {
      newFilterVaue: "",
    };
  },
  methods: {
    updateFilter() {
      this.$store.commit("updateFilters", {
        type: "global",
        newFilterVaue: this.newFilterVaue,
      });
    },
  },
};
</script>

<style scoped>

</style>